"use client";
import { Pagination } from "@/core/ui/components";
import { DashboardTicketCardList } from "@/core/ui/container";
import { AnimationWrapper, CardLoader } from "@/core/ui/layout";
import { I_TableTicketData } from "@/interfaces";

const GridView = ({ data }: { data: I_TableTicketData[] }) => {
  return (
    <AnimationWrapper>
      <div className="z-10 grid h-full w-full grid-cols-2 gap-10">
        <DashboardTicketCardList data={data} isGridCard />
      </div>
      <Pagination variant="hacker" />
    </AnimationWrapper>
  );
};
export default GridView;
