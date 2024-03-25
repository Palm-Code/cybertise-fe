import dynamic from "next/dynamic";
import { tableTicketData } from "../../constants/reports";

const Reports = dynamic(
  () => import("@/feature/company/components/reports/Reports.component"),
  {
    ssr: false,
  }
);

const ReportsFragment = () => {
  return <Reports data={tableTicketData} />;
};
export default ReportsFragment;
