"use client";
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

const CompaniesDetailsFragment = ({ id }: { id: string }) => {
  return <CompaniesDetail id={id} />;
};
export default CompaniesDetailsFragment;
