import { fetchGetPaymentStatus } from "@/core/services/payments";
import { VrpManagement } from "@/feature/company/components";
import { VRPLaunchpadFragment } from "@/feature/mediator/fragments";
import { getSession } from "@/service/server/session";

export default async function VRPLaunchpadPage() {
  const session = await getSession();
  const paymentStatus = await fetchGetPaymentStatus();

  if (session?.user.role === "mediator") {
    return <VRPLaunchpadFragment />;
  }

  return <VrpManagement paymentStatus={paymentStatus} />;
}
