import { NextResponse, type NextRequest } from "next/server";

const logoutUrl = process.env.NEXT_PUBLIC_KEYCLOAK_LOGOUT_URL;

export async function GET(request: NextRequest) {
  const redirectTarget = logoutUrl ?? new URL("/admin/login", request.url).toString();
  const response = NextResponse.redirect(redirectTarget);
  response.cookies.delete("admin_token");
  response.cookies.delete("admin_refresh");
  response.cookies.delete("pkce_verifier");
  return response;
}
