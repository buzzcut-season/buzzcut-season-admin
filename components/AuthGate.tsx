"use client";

import { useEffect, useState } from "react";

type AuthGateProps = {
  children: React.ReactNode;
};

const STORAGE_KEY = "buzzcut.auth";
const KEYCLOAK_AUTH_URL = process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_URL;

function readAccessToken(): string | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { accessToken?: string };
    return parsed?.accessToken ?? null;
  } catch {
    return null;
  }
}

export default function AuthGate({ children }: AuthGateProps) {
  const [allowed, setAllowed] = useState(false);
  const [missingConfig, setMissingConfig] = useState(false);

  useEffect(() => {
    const token = readAccessToken();
    if (token) {
      setAllowed(true);
      return;
    }
    if (KEYCLOAK_AUTH_URL) {
      window.location.replace(KEYCLOAK_AUTH_URL);
    } else {
      setMissingConfig(true);
    }
  }, []);

  if (!allowed) {
    return (
      <div className="card" style={{ margin: "3rem auto", maxWidth: 560 }}>
        <h2>Authorization required</h2>
        {missingConfig ? (
          <p>Missing `NEXT_PUBLIC_KEYCLOAK_AUTH_URL`.</p>
        ) : (
          <p>Redirecting to Keycloak...</p>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
