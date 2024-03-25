import { decrypt } from "@/server/auth";
import { UserType } from "@/types/auth/sign-up";
import { cookies } from "next/headers";
import { cache } from "react";

export const getSession = cache(async (): Promise<UserType | null> => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
});
