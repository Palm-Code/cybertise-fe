"use client";
import dynamic from "next/dynamic";

const Reports = dynamic(
  () => import("@/feature/mediator/components/reports/Reports.component"),
  {
    ssr: false,
  }
);

const ReportsFragment = () => {
  return <Reports />;
};
export default ReportsFragment;
