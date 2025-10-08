import { CreateVrpFragment } from "@/feature/company/fragments";
import { fetchGetPaymentStatus } from "@/core/services/payments";
import { notFound } from "next/navigation";

export default async function CreateVrpPage() {
  const paymentStatus = await fetchGetPaymentStatus();

  if (!paymentStatus?.active) {
    return notFound();
  }

  return <CreateVrpFragment />;
}
