import { Payment } from "@/feature/company/components";
import { getSession } from "@/service/server/session";
import { Role } from "@/types/admin/sidebar";

export default async function PaymentCompanyPage() {
  const session = await getSession();
  return <Payment variant={session?.user?.role as keyof typeof Role} />;
}
