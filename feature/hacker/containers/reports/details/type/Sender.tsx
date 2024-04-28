import { cn } from "@/core/lib/utils";
import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import { Avatar, Badge, Separator, Typography } from "@/core/ui/components";
import { formatTimestamp } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import { motion } from "framer-motion";

const Sender = ({
  data,
  isLoading,
}: {
  data?: I_GetChatListItemSuccessResponse["data"][0];
  isLoading?: boolean;
}) => {
  if (data)
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
        id="send-chat"
        className={cn(
          "tiptap grid h-fit max-h-full w-full",
          "grid-cols-[auto_1fr] place-items-start content-start gap-3"
        )}
      >
        <div className="_flexbox__col__center__start h-full w-fit gap-3">
          <Avatar image={data?.sender_avatar} initials="J" />
          <Separator
            orientation="vertical"
            className="h-[calc(100%-48px)] w-[0.5px]"
          />
        </div>
        <div className="_flexbox__col__start__start w-full gap-6 pb-12 xl:px-5">
          <Typography variant="p" affects="small" weight="bold">
            {data.sender_name}{" "}
          </Typography>
          <div className="_flexbox__row__center__start gap-2">
            <article
              dangerouslySetInnerHTML={{
                __html: sanitize(data?.content as string),
              }}
            ></article>
            {data?.badge && (
              <Badge variant={data.badge.toLowerCase() as any}>
                {data.badge}
              </Badge>
            )}
          </div>
          {data?.updated_at && (
            <Typography
              variant="p"
              affects="tiny"
              weight="medium"
              className="text-neutral-light-50 dark:text-neutral-dark-50"
            >
              {formatTimestamp(data?.updated_at ?? "")}
            </Typography>
          )}
        </div>
      </motion.div>
    );
};
export default Sender;
