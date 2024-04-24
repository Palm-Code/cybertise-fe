"use client";
import { Desktop, Mobile } from "@/core/ui/layout";
import VRPHeroCard from "./_card/VRPHeroCard";
import { SingleVrpContainer } from "@/feature/hacker/containers";
import { useGetProgramDetails } from "@/feature/hacker/query/client/useGetProgramDetails";
import { useProgramDetailsParamStore } from "@/feature/hacker/zustand/store/programs/program_details";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";

interface I_ProgramDetailsProps {
  id: string;
  assetTypes?: I_GetAssetTypeSuccessResponse["data"];
}

const ProgramDetails = ({ id, assetTypes }: I_ProgramDetailsProps) => {
  const store = useProgramDetailsParamStore();
  const { data: programDetails } = useGetProgramDetails(store.payload, id);

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start w-full">
          <VRPHeroCard id={id} data={programDetails?.data} />
          <div className="_flexbox__col__start__start w-full gap-4">
            <SingleVrpContainer
              data={programDetails?.data}
              assetTypes={assetTypes}
            />
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-10 pt-12">
          <VRPHeroCard id={id} data={programDetails?.data} />
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
