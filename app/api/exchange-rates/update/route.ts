import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.buzzcut-season.ru";

export async function POST() {
  const token = cookies().get("admin_token")?.value;

  const response = await fetch(
    `${API_BASE_URL}/api/admin/v1/exchange-rates/update`,
    {
      method: "POST",
      headers: token ? { Authorization: `Bearer ${token}` } : undefined
    }
  );

  const payload = await response.text();
  const contentType = response.headers.get("Content-Type");

  return new NextResponse(payload, {
    status: response.status,
    headers: contentType ? { "Content-Type": contentType } : undefined
  });
}
