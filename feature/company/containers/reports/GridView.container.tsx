"use client";
import { ReportsTicketCardList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_TableReportTicketData } from "@/interfaces";

const GridView = ({ data }: { data: I_TableReportTicketData[] }) => {
  return (
    <AnimationWrapper>
      <div className="z-10 grid h-full w-full gap-4 md:h-fit md:grid-cols-2 md:gap-10">
        <ReportsTicketCardList data={data as any} isGridCard />
      </div>
    </AnimationWrapper>
  );
};
export default GridView;
