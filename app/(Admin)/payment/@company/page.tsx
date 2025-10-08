import { fetchGetPaymentStatus } from "@/core/services/payments";
import { Payment } from "@/feature/company/components";
import { getSession } from "@/service/server/session";
import { Role } from "@/types/admin/sidebar";

export default async function PaymentCompanyPage() {
  const session = await getSession();
  const paymentStatus = await fetchGetPaymentStatus();
  return (
    <Payment
      variant={session?.user?.role as keyof typeof Role}
      paymentStatus={paymentStatus}
    />
  );
}
