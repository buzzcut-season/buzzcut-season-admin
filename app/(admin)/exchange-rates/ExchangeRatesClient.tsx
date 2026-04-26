"use client";

import { useState } from "react";
import styles from "../AdminPage.module.css";

function stringifyPayload(payload: unknown) {
  if (typeof payload === "string") {
    return payload;
  }

  try {
    return JSON.stringify(payload, null, 2);
  } catch {
    return "Update completed.";
  }
}

export default function ExchangeRatesClient() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<string>("Awaiting first manual sync...");
  const [lastCheck, setLastCheck] = useState<string>("--");

  async function handleUpdate() {
    setSubmitting(true);
    setStatus("Sync in progress...");

    try {
      const response = await fetch("/api/exchange-rates/update", {
        method: "POST"
      });

      const rawPayload = await response.text();

      if (!response.ok) {
        throw new Error(
          rawPayload || `Failed to update rates: ${response.status}`
        );
      }

      setStatus(rawPayload || "Exchange rates updated.");
      setLastCheck(new Date().toLocaleString());
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Failed to update rates."
      );
      setLastCheck(new Date().toLocaleString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className={`${styles.panel} card`}>
      <div className={styles.panelHeader}>
        <h2>Latest status</h2>
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleUpdate}
          disabled={submitting}
        >
          {submitting ? "Updating..." : "Update rates"}
        </button>
      </div>
      <div className={`${styles.logBox} card`}>
        <strong>Log output</strong>
        <span style={{ whiteSpace: "pre-wrap" }}>{status}</span>
        <span>Last check: {lastCheck}</span>
      </div>
    </section>
  );
}
