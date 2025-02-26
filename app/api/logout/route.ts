// app/api/logout/route.ts
import { cookies } from "next/headers";

export async function GET() {
  // Delete the session cookies
  const cookiesData = await cookies();
  cookiesData.delete("session");
  cookiesData.delete("token");

  return Response.json({ message: "Logged out successfully" });
}
