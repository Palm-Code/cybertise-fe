import DetailsVRP from "@/feature/company/components/vrp-management/details/DetailsVrp.component";
import { Role } from "@/types/admin/sidebar";

const DetailsVrpFragment = ({
  id,
  variant = "company",
}: {
  id: string;
  variant?: keyof typeof Role;
}) => {
  return <DetailsVRP id={id} variant={variant} />;
};
export default DetailsVrpFragment;
