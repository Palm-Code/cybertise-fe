"use client";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard/get_chat_list";
import { DashboardTicketCardList } from "@/core/ui/container";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { AnimationWrapper } from "@/core/ui/layout";

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
        ) : (
          <DashboardTicketCardList data={data} />
        )}
      </div>
    </AnimationWrapper>
  );
};
export default TicketView;
