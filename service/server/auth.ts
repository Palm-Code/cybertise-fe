"use server";
import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { SECRET_KEY } from "../../core/lib/config";
import { FormLoginSchema } from "../../types/auth/sign-in";
import { redirect } from "next/navigation";

const secretKey = SECRET_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ["HS256"],
  });
  return payload;
}

export async function login(formData: FormLoginSchema) {
  // Verify credentials && get the user
  const user = {
    email: formData.email,
    name: "john",
    role: formData.email.includes("@mediator.com")
      ? "mediator"
      : formData.email.includes("@company.com")
        ? "company"
        : "hacker",
    token: formData.email.includes("@mediator.com")
      ? ""
      : formData.email.includes("@company.com")
        ? "5|qhTAoeldvLd4WSiD2qYiU6gXu7ezthZMT6nbGHDk"
        : "1|KuqjwG8cC2XyatakotMS0gfokqy0l4fLevpX4bsW",
  };

  // Create the session
  const expires = new Date(Date.now() + 3600000 * 1000);
  const session = await encrypt({ user, expires });
  cookies().set("session", session, { expires, httpOnly: true });

  return { user };
}

export async function logout() {
  try {
    cookies().set("session", "", { expires: new Date(0) });
    cookies().set("token", "", { expires: new Date(0) });
  } catch (error) {
    console.log(error);
  } finally {
    redirect("/auth/signin");
  }
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  if (!session) return;

  // Refresh the session so it doesn't expire
  const parsed = await decrypt(session);
  parsed.expires = new Date(Date.now() + 3600000 * 1000);
  const res = NextResponse.next();
  res.cookies.set({
    name: "session",
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires,
  });
  return res;
}
