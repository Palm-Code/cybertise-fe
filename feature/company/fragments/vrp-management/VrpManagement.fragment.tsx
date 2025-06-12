import { fetchGetPaymentStatus } from "@/core/services/payments";
import { VrpManagement } from "../../components";

const VrpManagementFragment = async () => {
  const paymentStatus = await fetchGetPaymentStatus();

  return <VrpManagement paymentStatus={paymentStatus} />;
};
export default VrpManagementFragment;
