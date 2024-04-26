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
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ModalSendAttachment from "../_dialog/ModalSendAttachment";
import { ChatBubble } from "@/feature/hacker/containers";
import { useGetChatListItem } from "@/feature/hacker/query/client/useGetChatListItem";
import { useReportDetailsParamStore } from "@/feature/hacker/zustand/store/reports";
import { useRouter } from "next/navigation";

const ReportDetails = ({ id }: { id: string }) => {
  const { back } = useRouter();
  const store = useReportDetailsParamStore();
  const { data, isLoading, isFetching } = useGetChatListItem(store.payload, id);
  const chatRef = useRef<HTMLDivElement>(null);
  const [openAttachment, setOpenAttachment] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (chatRef.current && data) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isLoading, isFetching]);

  if (isLoading || isFetching) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <Loader2
          className="m-auto animate-spin text-lime-normal-light dark:text-lime-normal-dark"
          width={64}
          height={64}
        />
      </div>
    );
  }

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
              <div className="_flexbox__row__start__start gap-5">
                <Link href="/reports">
                  <MoveLeft width={24} height={24} />
                </Link>
                <div className="grid gap-4">
                  <Typography variant="h5" weight="bold">
                    {data?.data[0].chat_ticket.title}
                  </Typography>
                  <Badge
                    variant={
                      data?.data[0]?.chat_ticket?.risk_level_category.toLowerCase() as any
                    }
                  >
                    {`${data?.data[0].chat_ticket.risk_level} | ${data?.data[0].chat_ticket.risk_level_category}`}
                  </Badge>
                </div>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator
                  variant={
                    data?.data[0]?.chat_ticket?.status.toLowerCase() as any
                  }
                >
                  {data?.data[0].chat_ticket.status}
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
                  {data?.data[0].chat_ticket.title}
                </Typography>
                <Badge
                  variant={
                    data?.data[0]?.chat_ticket?.risk_level_category.toLowerCase() as any
                  }
                >
                  {`${data?.data[0].chat_ticket.risk_level} | ${data?.data[0].chat_ticket.risk_level_category}`}
                </Badge>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator
                  variant={
                    data?.data[0]?.chat_ticket?.status.toLowerCase() as any
                  }
                >
                  {data?.data[0].chat_ticket.status}
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
          isChat
          onClickSendAttachment={() => setOpenAttachment(true)}
        />
        <ModalSendAttachment
          isOpen={openAttachment}
          onClose={() => setOpenAttachment(false)}
          onClickSendAttachment={() => {}}
        />
      </Desktop>
      <div ref={chatRef}></div>
    </>
  );
};
export default ReportDetails;
