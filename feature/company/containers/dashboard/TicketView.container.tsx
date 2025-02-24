"use client";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard/get_chat_list";
import { DashboardTicketCardList } from "@/core/ui/container";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { AnimationWrapper } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

const TicketView = ({
  data,
  isLoading,
}: {
  data?: I_GetChatListSuccessResponse["data"];
  isLoading?: boolean;
}) => {
  return (
    <AnimationWrapper>
      <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
        {isLoading ? (
          <ChatListCardLoadingList />
        ) : data?.length === 0 ? (
          <EmptyState
            type="ticket"
            variant="company"
            className="mt-0"
          />
        ) : (
          <DashboardTicketCardList data={data} />
        )}
      </div>
    </AnimationWrapper>
  );
};
export default TicketView;
