// app/api/logout/route.ts
import { logout } from "@/service/server/auth";
import { NextResponse } from "next/server";

export async function GET() {
  // Delete the session cookies
  await logout();

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
