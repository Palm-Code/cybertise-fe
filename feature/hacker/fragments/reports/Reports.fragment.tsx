import dynamic from "next/dynamic";

const Reports = dynamic(
  () => import("@/feature/hacker/components/reports/Reports.component"),
  {
    ssr: true,
  }
);

const ReportsFragment = () => {
  return <Reports />;
};
export default ReportsFragment;
