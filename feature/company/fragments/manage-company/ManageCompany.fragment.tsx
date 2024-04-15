import dynamic from "next/dynamic";

const ManageCompany = dynamic(
  () =>
    import(
      "@/feature/company/components/manage-company/ManageCompany.component"
    ),
  {
    ssr: false,
  }
);

const ManageCompanyFragment = () => {
  return <ManageCompany />;
};

export default ManageCompanyFragment;
