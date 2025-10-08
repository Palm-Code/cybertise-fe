import { I_GetCompaniesSuccessResponse } from "@/core/models/mediator/companies/get_companies";
import {
  CompaniesTicketCardList,
  VRPCardLoadingList,
} from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";

const GridView = ({
  data,
  isLoading = false,
}: {
  data?: I_GetCompaniesSuccessResponse["data"];
  isLoading?: boolean;
}) => {
  return (
    <AnimationWrapper>
      <div className="z-10 grid h-full w-full gap-4 md:h-fit md:grid-cols-2 md:gap-6">
        {isLoading ? (
          <VRPCardLoadingList />
        ) : (
          <CompaniesTicketCardList
            data={data ?? []}
            isGridCard
          />
        )}
      </div>
    </AnimationWrapper>
  );
};
export default GridView;
