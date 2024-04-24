"use client";
import { DashboardTicketCardList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_TableTicketData } from "@/interfaces";

const GridView = ({ data }: { data: I_TableTicketData[] }) => {
  return (
    <AnimationWrapper>
      <div className="z-10 grid h-full w-full gap-4 md:h-fit md:grid-cols-2 md:gap-10">
        <DashboardTicketCardList data={data as any} isGridCard />
      </div>
    </AnimationWrapper>
  );
};
export default GridView;
