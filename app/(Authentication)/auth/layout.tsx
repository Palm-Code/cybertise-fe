import { getSession } from "@/auth";
import { AuthWrapper } from "@/core/ui/layout";
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
