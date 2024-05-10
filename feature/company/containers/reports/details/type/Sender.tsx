import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Separator,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { fileDownload } from "@/utils/file-download";
import { formatTimestamp } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import { motion } from "framer-motion";
import { Download, Eye, File } from "lucide-react";
import Image from "next/image";

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
          {data.has_link && (
            <blockquote className="_flexbox__col__start__start w-full gap-4">
              <Image
                src={data?.og_image as string}
                alt={data.og_title as string}
                width={512}
                height={512}
              />
              <Typography variant="p" affects="tiny" weight="medium">
                {data.og_title}
              </Typography>
              <Typography variant="p" affects="tiny" weight="medium">
                {data.og_description}
              </Typography>
            </blockquote>
          )}
          {data.media && data.media.length > 0 && (
            <div
              className={cn(
                "grid w-full gap-4",
                "grid-cols-1 md:max-w-2xl md:grid-cols-2"
              )}
            >
              {data.media?.map((file, index) => (
                <Card
                  className="_flexbox__row__center__start h-fit w-full gap-4 p-4 xl:p-4"
                  key={`file-${index}`}
                >
                  <div className="h-10 w-10">
                    <File
                      width={40}
                      height={40}
                      className={cn(
                        "h-10 w-10 rounded-full bg-neutral-light-90 p-2 dark:bg-neutral-dark-90",
                        iconColor.company
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "_flexbox__col__start__between h-full gap-1.5",
                      "w-full max-w-40 truncate overflow-ellipsis"
                    )}
                  >
                    <Tooltip
                      content={`${file.name}.${file.file_name.split(".")[1]}`}
                    >
                      <Typography variant="p" affects="small" weight="semibold">
                        {data.media && data.media?.length > 1
                          ? `${file.name.substring(0, 15)}.${file.file_name.split(".")[1]}` +
                            "..."
                          : `${file.name.substring(0, 15)}.${file.file_name.split(".")[1]}...`}
                      </Typography>
                    </Tooltip>
                    <Typography
                      variant="p"
                      affects="tiny"
                      className="text-neutral-light-40 dark:text-neutral-dark-40"
                    >
                      {(file.size / 1024).toFixed(2)}KB
                    </Typography>
                  </div>
                  <div className="_flexbox__row__center ml-auto gap-4">
                    <Button
                      asLink
                      href={file.original_url}
                      target="_blank"
                      variant="ghost-company"
                      className="p-0"
                      prefixIcon={<Eye className="h-6 w-6" />}
                    />
                    <Button
                      variant="ghost-company"
                      className="p-0"
                      onClick={() => fileDownload(file.original_url, file.name)}
                      prefixIcon={<Download className="h-6 w-6" />}
                    />
                  </div>
                </Card>
              ))}
            </div>
          )}
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
