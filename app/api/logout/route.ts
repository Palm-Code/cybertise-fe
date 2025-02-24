// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  // Delete the session cookies
  const cookiesData = await cookies();
  cookiesData.delete("session");
  cookiesData.delete("token");

  return NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );
}
