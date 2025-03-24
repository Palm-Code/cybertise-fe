import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import { useGetDownloadFiles } from "@/core/react-query/client";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Markdown,
  Separator,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { formatTimestamp } from "@/utils/formatter/date-formatter";
import { riskLevelCalculator } from "@/utils/risk-level-calculator";
import { motion } from "framer-motion";
import { Download, Eye, File, Link as LinkUrl } from "lucide-react";
import Link from "next/link";

const Sender = ({
  data,
  isLoading,
}: {
  data?: I_GetChatListItemSuccessResponse["data"][0];
  isLoading?: boolean;
}) => {
  const { mutate, isPending } = useGetDownloadFiles();
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
          <Avatar
            image={data?.sender_avatar}
            initials="J"
          />
          <Separator
            orientation="vertical"
            className="h-[calc(100%-48px)] w-[0.5px]"
          />
        </div>
        <div className="_flexbox__col__start__start w-full gap-6 pb-12 xl:px-5">
          <Typography
            variant="p"
            affects="small"
            weight="bold"
          >
            {data.sender_name}{" "}
          </Typography>
          <div className="_flexbox__row__center__start gap-2">
            <Markdown content={data.content || ""} />
            {data?.badge && (
              <Badge variant={riskLevelCalculator(data.badge)}>
                {data.status_badge}
              </Badge>
            )}
          </div>
          {data.has_link && (
            <Card
              className={cn(
                "grid h-fit w-full gap-4 rounded-lg !p-4 md:grid-cols-[auto_1fr]",
                "bg-background-main-light dark:bg-background-main-dark"
              )}
            >
              {data.og_image ? (
                <img
                  src={data.og_image || ""}
                  alt={data.og_title || ""}
                  width={120}
                  height={120}
                  className="!m-0 !aspect-square !w-24 !max-w-24 !rounded-lg object-cover"
                />
              ) : (
                <div
                  className={cn(
                    "!m-0 !aspect-square !w-24 !max-w-24 !rounded-lg",
                    "bg-neutral-light-80 dark:bg-neutral-dark-80",
                    "_flexbox__col__center"
                  )}
                >
                  <LinkUrl
                    width={72}
                    height={72}
                    className="my-auto text-brand-neutral dark:text-white"
                  />
                </div>
              )}
              <div className="_flexbox__row__start__between h-full w-full gap-4">
                <div className="_flexbox__col__start__between h-full gap-2.5">
                  <div>
                    <Typography
                      variant="p"
                      affects="small"
                      weight="semibold"
                    >
                      {data.og_title}
                    </Typography>
                    <Typography
                      variant="p"
                      affects="tiny"
                      className="text-neutral-light-40 dark:text-neutral-dark-40"
                    >
                      {data.og_description}
                    </Typography>
                  </div>
                  <Link
                    target="_blank"
                    href={data.og_url || "#"}
                  >
                    {data.og_url}
                  </Link>
                </div>
              </div>
            </Card>
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
                      <Typography
                        variant="p"
                        affects="small"
                        weight="semibold"
                      >
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
                      {(file.size / 1024).toFixed(1)}KB
                    </Typography>
                  </div>
                  <div className="_flexbox__row__center ml-auto gap-4">
                    {file.mime_type.includes("image") ? (
                      <Button
                        asLink
                        href={file.original_url}
                        target="_blank"
                        variant="ghost-company"
                        className="p-0"
                        prefixIcon={<Eye className="h-6 w-6" />}
                      />
                    ) : (
                      <Button
                        variant="ghost-company"
                        disabled={isPending}
                        className="p-0"
                        onClick={() =>
                          mutate({
                            id: file.uuid,
                            filename: file.file_name,
                          })
                        }
                        prefixIcon={<Download className="h-6 w-6" />}
                      />
                    )}
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
