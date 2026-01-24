import { NextResponse, type NextRequest } from "next/server";

const issuer = process.env.KEYCLOAK_ISSUER_URL;
const clientId = process.env.KEYCLOAK_CLIENT_ID;

function getSafeNextUrl(request: NextRequest) {
  const next = request.nextUrl.searchParams.get("next");
  if (!next || !next.startsWith("/") || next.startsWith("//")) {
    return "/";
  }
  return next;
}

export async function GET(request: NextRequest) {
  const refresh = request.cookies.get("admin_refresh")?.value;
  if (!refresh || !issuer || !clientId) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const tokenUrl = `${issuer}/protocol/openid-connect/token`;
  const body = new URLSearchParams({
    grant_type: "refresh_token",
    client_id: clientId,
    refresh_token: refresh
  });

  const tokenResponse = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body
  });

  if (!tokenResponse.ok) {
    const loginUrl = new URL("/admin/login", request.url);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("admin_token");
    response.cookies.delete("admin_refresh");
    return response;
  }

  const payload = (await tokenResponse.json()) as {
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    refresh_expires_in?: number;
  };

  if (!payload.access_token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.redirect(new URL(getSafeNextUrl(request), request.url));
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

  return response;
}
