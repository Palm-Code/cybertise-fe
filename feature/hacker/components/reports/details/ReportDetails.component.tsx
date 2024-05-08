"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  Card,
  Indicator,
  Tiptap,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { Loader2, MoveLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ModalSendAttachment from "../_dialog/ModalSendAttachment";
import { ChatBubble } from "@/feature/hacker/containers";
import { useGetChatListItem } from "@/feature/hacker/query/client/useGetChatListItem";
import { useReportDetailsParamStore } from "@/feature/hacker/zustand/store/reports";
import { useRouter } from "next/navigation";
import { usePostChatItem } from "@/core/react-query/client";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { toast } from "sonner";

const ReportDetails = ({ id }: { id: string }) => {
  const { back } = useRouter();
  const store = useReportDetailsParamStore();
  const { data, isError } = useGetChatListItem(store.payload, id);
  const chatRef = useRef<HTMLDivElement>(null);
  const [openAttachment, setOpenAttachment] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [files, setFiles] = useState<SendReportRequestType["files"]>();
  const { mutateAsync, isPending } = usePostChatItem();

  const scrollView = () => {
    chatRef?.current?.scrollIntoView({ behavior: "instant" });
  };

  useEffect(() => {
    scrollView();
  }, [description, data]);

  const sendMessage = async () => {
    if (description) {
      setAttachments([]);
      setDescription("");
      await mutateAsync({
        chat_ticket_id: id,
        sender_name: data?.data[0].sender_name,
        sender_avatar: data?.data[0].sender_avatar,
        content: description,
        attachments: attachments.length > 0 ? attachments : undefined,
      })
        .then(() => {
          setAttachments([]);
          setDescription("");
          setFiles(undefined);
          setOpenAttachment(false);
        })
        .catch((err) => {
          toast.error("Failed to send message");
        });
    }
  };

  if (isError || data?.data.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        No Chat Found
      </div>
    );
  }

  if (!data)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2
          className="m-auto animate-spin text-lime-normal-light dark:text-lime-normal-dark"
          width={32}
          height={32}
        />
      </div>
    );
  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start relative w-full">
          <div
            className={cn(
              "_flexbox__col__start__start sticky top-0 z-30",
              "h-fit w-full bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Card
              className={cn(
                "_flexbox__row__start__between sticky top-0",
                "z-30 w-full rounded-none p-6"
              )}
            >
              <div className="_flexbox__col__start__start gap-4">
                <Typography variant="h5" weight="bold">
                  {data?.data[0].chat_ticket?.title}
                </Typography>
                <Badge
                  variant={
                    data?.data[0]?.chat_ticket?.risk_level_category.toLowerCase() as any
                  }
                  className="max-w-fit"
                >
                  {`${data?.data[0].chat_ticket?.risk_level.toFixed(2)} | ${data?.data[0].chat_ticket?.risk_level_category}`}
                </Badge>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator
                  variant={
                    data?.data[0]?.chat_ticket?.status.toLowerCase() as any
                  }
                >
                  {data?.data[0].chat_ticket?.status}
                </Indicator>
              </div>
            </Card>
            <div
              className={cn(
                "sticky top-[8.15rem] z-30 w-full rounded-b-xl px-6 py-2",
                "bg-neutral-light-70 dark:bg-neutral-dark-70"
              )}
            >
              This chat is read only on this device. Please access using desktop
              to interact.
            </div>
          </div>
          <div className="px-6 py-8">
            <ChatBubble data={data?.data ?? []} />
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start relative w-full">
          <div
            className={cn(
              "_flexbox__col__start__start sticky top-0 z-30",
              "h-fit w-full gap-3 bg-background-page-light pt-12 dark:bg-background-page-dark"
            )}
          >
            <Card
              className={cn(
                "_flexbox__row__center__between sticky top-0",
                "z-30 w-full rounded-b-none rounded-t-2xl !p-6"
              )}
            >
              <div className="_flexbox__row__center__start gap-5">
                <MoveLeft
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  onClick={back}
                />
                <Typography variant="h5" weight="bold">
                  {data?.data[0]?.chat_ticket?.title}
                </Typography>
                <Badge
                  variant={
                    data?.data[0]?.chat_ticket?.risk_level_category.toLowerCase() as any
                  }
                >
                  {`${data?.data[0].chat_ticket?.risk_level} | ${data?.data[0].chat_ticket?.risk_level_category}`}
                </Badge>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator
                  variant={
                    data?.data[0]?.chat_ticket?.status.toLowerCase() as any
                  }
                >
                  {data?.data[0].chat_ticket?.status}
                </Indicator>
              </div>
            </Card>
            <AnimationWrapper>
              <div
                className={cn(
                  "sticky top-[8.15rem] z-30 h-4 w-full rounded-t-xl"
                )}
              ></div>
            </AnimationWrapper>
          </div>
          <ChatBubble data={data?.data ?? []} />
        </div>
        <Tiptap
          description={description}
          onChangeValue={(v) => {
            setDescription(v);
          }}
          variant="hacker"
          isLoading={isPending}
          isChat
          onClickSendAttachment={() => setOpenAttachment(true)}
          onClickSendMessage={sendMessage}
        />
        <ModalSendAttachment
          files={files}
          onChangeFiles={(v) => {
            setFiles(v);
          }}
          description={description}
          isOpen={openAttachment}
          onClose={() => {
            setFiles(undefined);
            setAttachments([]);
            setOpenAttachment(false);
          }}
          onChangeAttachment={(v) => {
            setAttachments(v);
          }}
          attachment={attachments}
          onChangeValue={(v) => {
            setDescription(v);
          }}
          onClickSendAttachment={sendMessage}
          isLoading={isPending}
        />
      </Desktop>
      <div ref={chatRef}></div>
    </>
  );
};
export default ReportDetails;
