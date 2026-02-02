"use client";

import { useEffect, useState } from "react";

type AuthGateProps = {
  children: React.ReactNode;
};

const STORAGE_KEY = "buzzcut.auth";

function mockAuthFromCode() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get("code");
  if (!code) return false;
  const mocked = { accessToken: code, refreshToken: "mock", expiresIn: 3600 };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mocked));
  url.searchParams.delete("code");
  url.searchParams.delete("session_state");
  url.searchParams.delete("iss");
  window.history.replaceState({}, "", url.toString());
  return true;
}

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

  useEffect(() => {
    if (mockAuthFromCode()) {
      setAllowed(true);
      return;
    }
    const token = readAccessToken();
    if (token) {
      setAllowed(true);
      return;
    }
    window.location.replace("/api/auth/login");
  }, []);

  if (!allowed) {
    return (
      <div className="card" style={{ margin: "3rem auto", maxWidth: 560 }}>
        <h2>Authorization required</h2>
        <p>Redirecting to Keycloak...</p>
      </div>
    );
  }

  return <>{children}</>;
}
