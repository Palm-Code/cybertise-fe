import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import {
  Avatar,
  Badge,
  Card,
  Separator,
  Typography,
} from "@/core/ui/components";
import Review from "@/feature/hacker/components/programs/send-report/steps/Review";
import Summary from "./type/Summary";
import System from "./type/System";
import Sender from "./type/Sender";

const ChatBubble = ({
  data,
}: {
  data?: I_GetChatListItemSuccessResponse["data"];
}) => {
  return (
    <div className="_flexbox__col__start__start h-fit w-full gap-6 xl:pb-28">
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
