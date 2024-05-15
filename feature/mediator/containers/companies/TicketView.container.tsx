"use client";
import { I_GetCompaniesSuccessResponse } from "@/core/models/mediator/companies/get_companies";
import {
  CompaniesTicketCardList,
  VRPCardLoadingList,
} from "@/core/ui/container";
import { AnimationWrapper } from "@/core/ui/layout";

const TicketView = ({
  data,
  isLoading = false,
}: {
  data?: I_GetCompaniesSuccessResponse["data"];
  isLoading?: boolean;
}) => {
  return (
    <AnimationWrapper>
      <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
        {isLoading ? (
          <VRPCardLoadingList />
        ) : (
          <CompaniesTicketCardList data={data ?? []} />
        )}
      </div>
    </AnimationWrapper>
  );
};
export default TicketView;
