"use client";
import { Loader } from "@/core/ui/components";
import { DetailsVRPLaunchpad } from "@/core/ui/container";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useGetProgramDetails } from "@/feature/company/query/client/useGetProgramDetails";
import { useProgramDetailsParamStore } from "@/feature/company/zustand/store/programs/program_details";

const DetailsVRP = ({ id }: { id: string }) => {
  const store = useProgramDetailsParamStore();
  const {
    data: detailsVrpData,
    isLoading,
    isFetching,
  } = useGetProgramDetails(store.payload, id);

  if (isLoading || isFetching) return <Loader variant="company" />;

  return (
    <>
      <Mobile>
        <EmptyState variant="company" type="default" />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start relative w-full pb-28">
          <DetailsVRPLaunchpad
            initialData={detailsVrpData?.data}
            variant="company"
            currentStep={detailsVrpData?.data.status}
          />
        </div>
      </Desktop>
    </>
  );
};
export default DetailsVRP;
