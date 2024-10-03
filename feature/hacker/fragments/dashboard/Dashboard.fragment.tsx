import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("@/feature/hacker/components/dashboard/Dashboard.component"),
  {
    ssr: false,
  }
);

const DashboardFragment = () => {
  return <Dashboard />;
};
export default DashboardFragment;
