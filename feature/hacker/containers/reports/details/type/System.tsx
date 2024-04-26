import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import { Avatar, Badge, Separator, Typography } from "@/core/ui/components";
import { formatTimestamp } from "@/utils/formatter/date-formatter";

const System = ({
  data,
}: {
  data?: I_GetChatListItemSuccessResponse["data"][0];
}) => {
  return (
    <div className="grid h-fit max-h-full w-full grid-cols-[auto_1fr] place-items-start content-start gap-3">
      <div className="_flexbox__col__center__start h-full w-fit gap-3">
        <Avatar image={data?.sender_avatar} initials="S" />
        <Separator
          orientation="vertical"
          className="h-[calc(100%-48px)] w-[0.5px]"
        />
      </div>
      <div className="_flexbox__col__start__start w-full gap-6 pb-12 xl:px-5">
        <div className="_flexbox__row__center__start gap-2">
          <Typography variant="p" affects="small" weight="bold">
            SYSTEM: {data?.content}
          </Typography>
          {data?.badge && (
            <Badge variant={data.badge.toLowerCase() as any}>
              {`${data.chat_ticket.risk_level} | ${data.badge}`}
            </Badge>
          )}
        </div>
        <Typography
          variant="p"
          affects="tiny"
          weight="medium"
          className="text-neutral-light-50 dark:text-neutral-dark-50"
        >
          {formatTimestamp(data?.updated_at ?? "")}
        </Typography>
      </div>
    </div>
  );
};
export default System;
