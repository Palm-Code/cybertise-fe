"use client";
import { Desktop, Mobile } from "@/core/ui/layout";
import VRPHeroCard from "./_card/VRPHeroCard";
import { SingleVrpContainer } from "@/feature/hacker/containers";
import { useGetProgramDetails } from "@/feature/hacker/query/client/useGetProgramDetails";
import { useProgramDetailsParamStore } from "@/feature/hacker/zustand/store/programs/program_details";
import { useGetAssetType } from "@/core/react-query/client/useGetAssetType";
import { VRPHeroLoading } from "@/core/ui/container";

interface I_ProgramDetailsProps {
  id: string;
}

const ProgramDetails = ({ id }: I_ProgramDetailsProps) => {
  const { data: assetTypes } = useGetAssetType();
  const store = useProgramDetailsParamStore();
  const { data: programDetails, isLoading } = useGetProgramDetails(
    store.payload,
    id
  );

  if (isLoading) return <VRPHeroLoading />;

  return (
    <>
      <Mobile>
        <div
          className="_flexbox__col__start__start w-full"
          suppressHydrationWarning
        >
          {isLoading ? (
            <VRPHeroLoading />
          ) : (
            <VRPHeroCard data={programDetails?.data} />
          )}
          <div className="_flexbox__col__start__start w-full gap-4">
            <SingleVrpContainer
              data={programDetails?.data}
              assetTypes={assetTypes}
            />
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div
          className="_flexbox__col__start__start w-full gap-10 pt-12"
          suppressHydrationWarning
        >
          {isLoading ? (
            <VRPHeroLoading />
          ) : (
            <VRPHeroCard data={programDetails?.data} />
          )}
          <div className="_flexbox__col__start__start w-full gap-4">
            <SingleVrpContainer
              data={programDetails?.data}
              assetTypes={assetTypes}
            />
          </div>
        </div>
      </Desktop>
    </>
  );
};
export default ProgramDetails;
