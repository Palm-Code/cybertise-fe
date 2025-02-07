// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Delete the session cookies
  cookies().delete("session");
  cookies().delete("token");

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
