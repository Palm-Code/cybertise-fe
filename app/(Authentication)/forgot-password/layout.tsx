import { AuthWrapper } from "@/core/ui/layout";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthWrapper>{children}</AuthWrapper>;
}
