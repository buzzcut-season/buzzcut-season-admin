"use client";

import { useCallback } from "react";

const STORAGE_KEY = "buzzcut.auth";
const LOGOUT_URL = process.env.NEXT_PUBLIC_KEYCLOAK_LOGOUT_URL;
const AUTH_URL = process.env.NEXT_PUBLIC_KEYCLOAK_AUTH_URL;

export default function UserMenu() {
  const handleLogout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    const target = LOGOUT_URL || AUTH_URL;
    if (target) {
      window.location.replace(target);
    } else {
      window.location.reload();
    }
  }, []);

  return (
    <div className="card" style={{ padding: "10px 14px" }}>
      <div style={{ display: "grid", gap: 6 }}>
        <span className="badge">Admin</span>
        <strong style={{ fontSize: "0.95rem" }}>Admin User</strong>
        <span className="muted" style={{ fontSize: "0.8rem" }}>
          admin@buzzcut-season.ru
        </span>
      </div>
      <button
        className="btn"
        onClick={handleLogout}
        style={{ marginTop: 10, width: "100%" }}
        type="button"
      >
        Logout
      </button>
    </div>
  );
}
