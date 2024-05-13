"use client";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import { VRPCardLoadingList, VRPTicketCardList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";

const TicketView = ({
  data,
  isLoading,
}: {
  data: I_GetProgramListSuccessResponse["data"];
  isLoading?: boolean;
}) => {
  return (
    <AnimationWrapper>
      <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
        {isLoading ? <VRPCardLoadingList /> : <VRPTicketCardList data={data} />}
      </div>
    </AnimationWrapper>
  );
};
export default TicketView;
