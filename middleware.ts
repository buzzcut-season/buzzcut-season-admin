import { NextResponse, type NextRequest } from "next/server";
import { createRemoteJWKSet, jwtVerify } from "jose";

const issuer = process.env.KEYCLOAK_ISSUER_URL;
const jwks = issuer
  ? createRemoteJWKSet(new URL(`${issuer}/protocol/openid-connect/certs`))
  : null;

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/admin/login") ||
    pathname.startsWith("/api/auth")
  ) {
    return NextResponse.next();
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/robots")
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_token")?.value;
  const refresh = request.cookies.get("admin_refresh")?.value;
  if (!issuer || !jwks) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (!token && refresh) {
    const refreshUrl = new URL("/api/auth/refresh", request.url);
    refreshUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(refreshUrl);
  }

  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    await jwtVerify(token, jwks, { issuer });
    return NextResponse.next();
  } catch {
    if (refresh) {
      const refreshUrl = new URL("/api/auth/refresh", request.url);
      refreshUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(refreshUrl);
    }
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
