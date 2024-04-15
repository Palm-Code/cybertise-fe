import { VRPTicketCardList } from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";
import { VRPCardType } from "@/types/admin/vrp-launchpad";

const GridView = ({ data }: { data: VRPCardType[] }) => {
  return (
    <AnimationWrapper>
      <div className="z-10 grid h-full w-full gap-4 md:grid-cols-2 md:gap-10">
        <VRPTicketCardList data={data} isGridCard />
      </div>
    </AnimationWrapper>
  );
};
export default GridView;
