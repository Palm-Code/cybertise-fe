import dynamic from "next/dynamic";

const Companies = dynamic(
  () => import("@/feature/mediator/components/companies/Companies.component"),
  {
    ssr: false,
  }
);

const CompaniesFragment = () => {
  return <Companies />;
};
export default CompaniesFragment;
