"use client";
import { Pagination } from "@/core/ui/components";
import { ProgramsTicketCardList } from "@/core/ui/container";
import { ProgramCardType } from "@/types/admin/programs";

const GridView = ({ data }: { data: ProgramCardType[] }) => {
  return (
    <>
      <div className="z-10 grid h-full w-full grid-cols-2 gap-10">
        <ProgramsTicketCardList data={data} isGridCard />
      </div>
      <Pagination variant="hacker" />
    </>
  );
};
export default GridView;
