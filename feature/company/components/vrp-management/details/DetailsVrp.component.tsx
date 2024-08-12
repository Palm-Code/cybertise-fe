"use client";
import { Loader } from "@/core/ui/components";
import { DetailsVRPLaunchpad } from "@/core/ui/container";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useGetProgramDetails } from "@/feature/company/query/client/useGetProgramDetails";
import { useProgramDetailsParamStore } from "@/feature/company/zustand/store/programs/program_details";
import { Role } from "@/types/admin/sidebar";

const DetailsVRP = ({
  id,
  variant = "company",
}: {
  id: string;
  variant?: keyof typeof Role;
}) => {
  const store = useProgramDetailsParamStore();
  const {
    data: detailsVrpData,
    isLoading,
    isFetching,
  } = useGetProgramDetails(store.payload, id);

  if (isLoading || isFetching) return <Loader variant={variant} />;

  return (
    <>
      <div className="wrapper__mobile">
        <EmptyState variant={variant} type="default" />
      </div>
      <div className="wrapper__desktop">
        <div className="_flexbox__col__start__start relative w-full pb-28">
          <DetailsVRPLaunchpad
            initialData={detailsVrpData?.data}
            variant={variant}
            currentStep={detailsVrpData?.data.status}
          />
        </div>
      </div>
    </>
  );
};
export default DetailsVRP;
