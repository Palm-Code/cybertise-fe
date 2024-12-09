import { decrypt } from "@/service/server/auth";
import { UserType } from "@/types/auth/sign-up";
import { cookies } from "next/headers";

export const getSession = async (): Promise<UserType | null> => {
  const session = cookies().get("session")?.value;
  if (!session) return null;
  return await decrypt(session);
};
