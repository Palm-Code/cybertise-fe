import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import {
  ProgramsTicketCardList,
  ProgramsTicketLoadingCardList,
} from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";

const GridView = ({
  data,
  isLoading,
}: {
  data?: I_GetProgramListSuccessResponse["data"];
  isLoading?: boolean;
}) => {
  if (data)
    return (
      <AnimationWrapper>
        <div className="z-10 grid h-full w-full gap-4 md:h-fit md:grid-cols-2 md:gap-6">
          {isLoading ? (
            <ProgramsTicketLoadingCardList isGridCard />
          ) : (
            <ProgramsTicketCardList data={data} isGridCard />
          )}
        </div>
      </AnimationWrapper>
    );
};
export default GridView;
