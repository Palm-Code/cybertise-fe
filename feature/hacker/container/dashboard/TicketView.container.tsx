import { Pagination } from "@/core/ui/components";
import { TicketCardList } from "@/core/ui/container";
import { I_TableTicketData } from "@/interfaces";

const TicketView = ({ data }: { data: I_TableTicketData[] }) => {
  return (
    <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
      <TicketCardList data={data} />
      <Pagination variant="hacker" />
    </div>
  );
};
export default TicketView;
