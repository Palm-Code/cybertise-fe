import dynamic from "next/dynamic";

const CompaniesDetail = dynamic(
  () =>
    import(
      "@/feature/mediator/components/companies/details/CompaniesDetail.component"
    ),
  {
    ssr: false,
  }
);

const CompaniesDetailsFragment = () => {
  return <CompaniesDetail />;
};
export default CompaniesDetailsFragment;
