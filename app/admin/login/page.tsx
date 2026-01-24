export default function AdminLoginPage() {
  return (
    <div className="card" style={{ maxWidth: 520, margin: "12vh auto", padding: 28 }}>
      <span className="badge">Admin access</span>
      <h2 style={{ marginTop: 14 }}>Sign in to continue</h2>
      <p className="muted" style={{ marginTop: 8 }}>
        Use your Keycloak account to access the admin console.
      </p>
      <a className="btn btn-primary" href="/api/auth/login" style={{ marginTop: 18 }}>
        Continue with Keycloak
      </a>
    </div>
  );
}
