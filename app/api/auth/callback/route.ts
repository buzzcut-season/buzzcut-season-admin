import { NextResponse, type NextRequest } from "next/server";

const issuer = process.env.KEYCLOAK_ISSUER_URL;
const clientId = process.env.KEYCLOAK_CLIENT_ID;
const redirectUri = process.env.KEYCLOAK_REDIRECT_URI;

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const verifier = request.cookies.get("pkce_verifier")?.value;

  if (!issuer || !clientId || !redirectUri) {
    return NextResponse.json(
      { error: "Missing KEYCLOAK_ISSUER_URL/KEYCLOAK_CLIENT_ID/KEYCLOAK_REDIRECT_URI" },
      { status: 500 }
    );
  }

  if (!code || !verifier) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "missing_code");
    return NextResponse.redirect(url);
  }

  const tokenUrl = `${issuer}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
    code_verifier: verifier
  });

  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  if (!tokenResponse.ok) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "token_exchange_failed");
    return NextResponse.redirect(url);
  }

  const payload = (await tokenResponse.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    refresh_expires_in?: number;
  };

  if (!payload.access_token) {
    const url = new URL("/admin/login", request.url);
    url.searchParams.set("error", "missing_access_token");
    return NextResponse.redirect(url);
  }

  const response = NextResponse.redirect(new URL("/", request.url));
  response.cookies.set("admin_token", payload.access_token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: payload.expires_in ?? 3600
  });

  if (payload.refresh_token) {
    response.cookies.set("admin_refresh", payload.refresh_token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: payload.refresh_expires_in ?? 604800
    });
  }

  response.cookies.delete("pkce_verifier");
  return response;
}
