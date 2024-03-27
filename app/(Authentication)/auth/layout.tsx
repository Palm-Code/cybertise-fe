import { AuthWrapper } from "@/core/ui/layout";
import { getSession } from "@/service/server/session";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (session) {
    redirect("/dashboard");
  }
  return <AuthWrapper>{children}</AuthWrapper>;
}
