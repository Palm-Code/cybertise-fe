"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  badgeVariants,
  Button,
  Card,
  Indicator,
  Loader,
  Tiptap,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { ChevronDown, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ModalSendAttachment from "../_dialog/ModalSendAttachment";
import { ChatBubble } from "@/feature/company/containers";
import { useGetChatListItem } from "@/feature/company/query/client/useGetChatListItem";
import { useReportDetailsParamStore } from "@/feature/company/zustand/store/reports";
import { useRouter } from "next/navigation";
import {
  useGetTicketDetails,
  useGetUserData,
  usePostChatItem,
} from "@/core/react-query/client";
import { SendReportRequestType } from "@/core/models/common";
import { toast } from "sonner";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import { useInView } from "react-intersection-observer";

let firstRender = true;
const ReportDetails = ({ id }: { id: string }) => {
  const { back } = useRouter();
  const store = useReportDetailsParamStore();
  const { data: userData } = useGetUserData();
  const { data: ticketDetails, isError: isErrorTicket } =
    useGetTicketDetails(id);
  const { data, isError, isFetchingNextPage, fetchNextPage } =
    useGetChatListItem(store.payload, id);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { ref: endChatRef, inView: inViewEnd } = useInView({ threshold: 0.5 });
  const chatData = data?.pages.map((page) => page.data).flat();
  const chatRef = useRef<HTMLDivElement>(null);
  const [openAttachment, setOpenAttachment] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [files, setFiles] = useState<SendReportRequestType["files"]>();
  const { mutateAsync, isPending } = usePostChatItem();

  const scrollView = () => {
    chatRef?.current?.scrollIntoView({ behavior: "instant" });
  };

  const [firstRender, setIsFirstRender] = useState<boolean>(true);

  useEffect(() => {
    if (firstRender) {
      scrollView();
    }

    return () => {
      setIsFirstRender(false);
    };
  }, [data, firstRender]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const sendMessage = async () => {
    await mutateAsync({
      chat_ticket_id: id,
      sender_name:
        userData?.role.toLowerCase() === "company staff"
          ? `${userData?.name} (${userData?.role})`
          : userData?.name,
      sender_avatar: userData?.avatar,
      content: description ?? undefined,
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
  };

  const isHiddenChatBox =
    (ticketDetails &&
      (ticketDetails.status.toLowerCase() === "closed" ||
        ticketDetails.status.toLowerCase() === "canceled")) ||
    false;

  if (isError || isErrorTicket || chatData?.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        No Chat Found
      </div>
    );
  }

  if (!data?.pages || !ticketDetails)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader variant="company" />
      </div>
    );
  return (
    <>
      <div ref={ref}></div>
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
                <div className="_flexbox__col__start__start gap-4">
                  <Typography variant="h5" weight="bold">
                    {`#${ticketDetails.code}: ${ticketDetails.title}`}
                  </Typography>
                  <Badge
                    variant={
                      ticketDetails.risk_level_category.toLowerCase() as any
                    }
                    className="max-w-fit"
                  >
                    {`${ticketDetails.risk_level} | ${ticketDetails.risk_level_category}`}
                  </Badge>
                </div>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator
                  variant={
                    ticketDetails.status.toLowerCase() as keyof typeof indicatorVariants
                  }
                >
                  {ticketDetails.status}
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
          {isFetchingNextPage && (
            <Loader variant="company" width={12} height={12} className="h-12" />
          )}
          <div className="px-6 py-8">
            <ChatBubble data={chatData ?? []} />
          </div>
          <div ref={endChatRef}></div>
          {!inViewEnd && (
            <Button
              variant="default"
              className={cn(
                "fixed z-50 mx-auto w-fit",
                "left-1/2 -translate-x-1/2 transform",
                isHiddenChatBox ? "bottom-4" : "bottom-12"
              )}
              prefixIcon={<ChevronDown className="!text-neutral-dark-100" />}
              onClick={() => {
                chatRef?.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography
                variant="p"
                affects="small"
                className="!text-neutral-dark-100"
              >
                Jump into last message
              </Typography>
            </Button>
          )}
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
                  {`#${ticketDetails.code}: ${ticketDetails.title}`}
                </Typography>
                <Badge
                  variant={
                    ticketDetails.risk_level_category.toLowerCase() as keyof typeof badgeVariants
                  }
                  className="max-w-fit"
                >
                  {`${ticketDetails.risk_level} | ${ticketDetails.risk_level_category}`}
                </Badge>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator
                  variant={
                    ticketDetails.status.toLowerCase() as keyof typeof indicatorVariants
                  }
                >
                  {ticketDetails.status}
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
          {isFetchingNextPage && (
            <Loader variant="company" width={12} height={12} className="h-12" />
          )}
          <ChatBubble data={chatData ?? []} />
          <div ref={endChatRef}></div>
        </div>
        {!inViewEnd && (
          <Button
            variant="default"
            className={cn(
              "absolute z-50 mx-auto w-fit",
              "left-1/2 transform",
              isHiddenChatBox ? "bottom-12" : "bottom-72"
            )}
            prefixIcon={<ChevronDown className="!text-neutral-dark-100" />}
            onClick={() => {
              chatRef?.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Typography
              variant="p"
              affects="small"
              className="!text-neutral-dark-100"
            >
              Jump into last message
            </Typography>
          </Button>
        )}
        {!isHiddenChatBox && (
          <div
            className={cn(
              "sticky bottom-0 z-50 bg-background-page-light py-8 dark:bg-background-page-dark"
            )}
          >
            <Tiptap
              description={description}
              onChangeValue={(v) => {
                setDescription(v);
              }}
              placeholder="Write your message..."
              variant="company"
              isLoading={isPending}
              isChat
              onClickSendAttachment={() => setOpenAttachment(true)}
              onClickSendMessage={sendMessage}
            />
          </div>
        )}
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
