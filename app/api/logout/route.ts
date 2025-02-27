// app/api/logout/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const cookiesData = await cookies();
  const { token } = await request.json();
  // Delete the session cookies
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/auth/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token }),
  });

  if (!res.ok) {
    return NextResponse.json({ message: "Failed to logout" }, { status: 500 });
  }

  cookiesData.delete("session");
  cookiesData.delete("token");

  return NextResponse.redirect(new URL("/auth/signin", request.url));
}
