import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import Summary from "./type/Summary";
import System from "./type/System";
import Sender from "./type/Sender";
import { useGetMutationState } from "@/core/react-query/client";
import { useUserStore } from "@/core/zustands/user";

const ChatBubble = ({
  data,
}: {
  data: I_GetChatListItemSuccessResponse["data"];
}) => {
  const mutations = useGetMutationState();

  return (
    <div className="flex h-fit w-full flex-col-reverse items-start justify-start gap-6 xl:pb-28">
      {mutations?.map((item, idx) => (
        <Sender data={item} key={`sender-mutation-${idx}`} isLoading />
      ))}
      {data &&
        data.map((item, idx) => {
          if (item.sender === "Summary")
            return <Summary data={item} key={`summary-${idx}`} />;
          else if (item.sender === "Systems")
            return <System data={item} key={`User-${idx}`} />;
          else return <Sender data={item} key={`sender-${idx}`} />;
        })}
    </div>
  );
};
export default ChatBubble;
