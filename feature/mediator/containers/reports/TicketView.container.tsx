import { Pagination } from "@/core/ui/components";
import { ReportsTicketCardList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_TableReportTicketData } from "@/interfaces";

const TicketView = ({ data }: { data: I_TableReportTicketData[] }) => {
  return (
    <AnimationWrapper>
      <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
        <ReportsTicketCardList data={data} isMediator />
      </div>
    </AnimationWrapper>
  );
};
export default TicketView;
