import { Pagination } from "@/core/ui/components";
import { TicketCardList } from "@/core/ui/container";
import { I_TableTicketData } from "@/interfaces";

const GridView = ({ data }: { data: I_TableTicketData[] }) => {
  return (
    <>
      <div className="z-10 grid h-full w-full grid-cols-2 gap-10">
        <TicketCardList data={data} isGridCard />
      </div>
      <Pagination variant="hacker" />
    </>
  );
};
export default GridView;
