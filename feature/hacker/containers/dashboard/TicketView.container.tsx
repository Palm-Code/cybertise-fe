"use client";
import { Pagination } from "@/core/ui/components";
import { DashboardTicketCardList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_TableTicketData } from "@/interfaces";

const TicketView = ({ data }: { data: I_TableTicketData[] }) => {
  return (
    <AnimationWrapper>
      <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
        <DashboardTicketCardList data={data} />
      </div>
    </AnimationWrapper>
  );
};
export default TicketView;
