"use client";
import { Pagination } from "@/core/ui/components";
import { ProgramsTicketCardList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";
import { ProgramCardType } from "@/types/admin/programs";

const TicketView = ({ data }: { data: ProgramCardType[] }) => {
  return (
    <AnimationWrapper>
      <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
        <ProgramsTicketCardList data={data} />
        <Pagination variant="hacker" />
      </div>
    </AnimationWrapper>
  );
};
export default TicketView;
