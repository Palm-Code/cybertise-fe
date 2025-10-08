"use server";
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SECRET_KEY } from "../../core/lib/config";
import { Role } from "@/types/admin/sidebar";
import { I_GetAccessTokenSuccessResponse } from "@/core/models/auth/login/get_access_token";
import { redirect } from "next/navigation";

const secretKey = SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

export async function authorize(
  formData: I_GetAccessTokenSuccessResponse["data"]
) {
  const user = {
    role: formData.role && (formData.role.toLowerCase() as keyof typeof Role),
    token: formData["access-token"],
    language: formData.language,
  };

  // Create the session
  // const expires = new Date(Date.now() + 2592000000);
  const session = await encrypt({ user });
  (await cookies()).set("session", session, { httpOnly: true });

  return { user };
}

export async function logout() {
  try {
    (await cookies()).set("session", "", { expires: new Date(0) });
    (await cookies()).set("token", "", { expires: new Date(0) });
  } catch (error) {
    throw new Error("Failed to logout");
  } finally {
    redirect("/auth/signin");
  }
}
export async function logoutwithoutrevalidate() {
  try {
    (await cookies()).set("session", "", { expires: new Date(0) });
    (await cookies()).set("token", "", { expires: new Date(0) });
  } catch (error) {
    throw new Error("Failed to logout");
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  // parsed.expires = new Date(Date.now() + 2592000000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    // expires: parsed.expires,
  });
  return res;
}
