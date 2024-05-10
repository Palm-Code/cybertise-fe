import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { ReportsTicketCardList } from "@/core/ui/container";
import ChatListCardLoadingList from "@/core/ui/container/loading-state/ChatLoadingList.container";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_TableReportTicketData } from "@/interfaces";

const TicketView = ({
  data,
  isLoading,
}: {
  data?: I_GetChatListSuccessResponse["data"];
  isLoading?: boolean;
}) => {
  if (data)
    return (
      <AnimationWrapper>
        <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
          {isLoading ? (
            <ChatListCardLoadingList />
          ) : (
            <ReportsTicketCardList data={data} isMediator />
          )}
        </div>
      </AnimationWrapper>
    );
};
export default TicketView;
