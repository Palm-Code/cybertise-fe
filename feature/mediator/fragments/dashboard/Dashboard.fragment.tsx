import dynamic from "next/dynamic";
import { tableTicketData } from "../../constants/dashboard";

const Dashboard = dynamic(
  () => import("@/feature/mediator/components/dashboard/Dashboard.component"),
  {
    ssr: false,
  }
);

const DashboardFragment = () => {
  return <Dashboard data={[]} />;
};
export default DashboardFragment;
