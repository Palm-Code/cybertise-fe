import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const req = await request.json();
  const cookieStore = await cookies();
  console.log(req.language);
  cookieStore.set("language", req.language);
  return NextResponse.json({ message: "Language set" });
}
