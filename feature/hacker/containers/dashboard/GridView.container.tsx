"use client";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard/get_chat_list";
import { DashboardTicketCardList } from "@/core/ui/container";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { AnimationWrapper } from "@/core/ui/layout";

const GridView = ({
  data,
  isLoading,
}: {
  data?: I_GetChatListSuccessResponse["data"];
  isLoading?: boolean;
}) => {
  return (
    <AnimationWrapper>
      <div className="z-10 grid h-full w-full gap-4 md:h-fit md:grid-cols-2 md:gap-6">
        {isLoading ? (
          <ChatListCardLoadingList isGridCard />
        ) : (
          <DashboardTicketCardList data={data} isGridCard />
        )}
      </div>
    </AnimationWrapper>
  );
};
export default GridView;
