import { getSession } from "@/service/server/session";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getSession();
  if (session) {
    return redirect("/dashboard");
  }
  return redirect("/auth/signin");
}
