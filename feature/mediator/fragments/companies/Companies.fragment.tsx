import dynamic from "next/dynamic";
import { vrpCardsData } from "../../constants/vrp-launchpad";

const Companies = dynamic(
  () => import("@/feature/mediator/components/companies/Companies.component"),
  {
    ssr: false,
  }
);

const CompaniesFragment = () => {
  return <Companies data={vrpCardsData} />;
};
export default CompaniesFragment;
