"use client";
import { VRPTicketCardList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";
import { VRPCardType } from "@/types/admin/vrp-launchpad";

const TicketView = ({ data }: { data: VRPCardType[] }) => {
  return (
    <AnimationWrapper>
      <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
        <VRPTicketCardList data={data} />
      </div>
    </AnimationWrapper>
  );
};
export default TicketView;
