"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
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
import { ChatBubble } from "@/feature/mediator/containers";
import { useGetChatListItem } from "@/feature/mediator/query/client/useGetChatListItem";
import { useReportDetailsParamStore } from "@/feature/mediator/zustand/store/reports";
import {
  useGetTicketDetails,
  useGetUserData,
  usePostChatItem,
} from "@/core/react-query/client";
import { SendReportRequestType } from "@/core/models/common";
import { toast } from "sonner";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import ModalEditRiskLevel from "../_dialog/ModalEditRiskLevel";
import StatusDropdown from "../_dropdown/StatusDropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import { usePostUpdateTicket } from "@/feature/mediator/query/client";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { ModalForbidden } from "@/core/ui/container";

const ReportDetails = ({ id }: { id: string }) => {
  const { back } = useRouter();
  const store = useReportDetailsParamStore();
  const { data: userData } = useGetUserData();
  const { data: ticketDetails, isError: isErrorTicket } =
    useGetTicketDetails(id);
  const { data, isError, isRefetching, fetchNextPage, isFetchingNextPage } =
    useGetChatListItem(store.payload, id);
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { ref: endChatRef, inView: inViewEnd } = useInView({ threshold: 0.5 });
  const chatData = data?.pages.map((page) => page.data).flat();
  const chatRef = useRef<HTMLDivElement>(null);
  const [openAttachment, setOpenAttachment] = useState<boolean>(false);
  const [openModalEditRiskLevel, setOpenModalSetRiskLevel] =
    useState<boolean>(false);
  const [openModalForbidden, setOpenModalForbidden] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [files, setFiles] = useState<SendReportRequestType["files"]>();
  const { mutateAsync, isPending } = usePostChatItem();
  const { mutateAsync: mutateUpdateTicket, isPending: isPendingUpdate } =
    usePostUpdateTicket(id);
  const [isManualRisk, setIsManualRisk] = useState<boolean>(
    !ticketDetails?.cvss_string
  );

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
      sender_name: `${userData?.name} (${userData?.role})`,
      sender_avatar: userData?.avatar,
      content: description ?? undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    })
      .then(() => {
        setAttachments([]);
        setDescription("");
        setFiles(undefined);
        setOpenAttachment(false);
        chatRef?.current?.scrollIntoView({ behavior: "smooth" });
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
        <Loader variant="mediator" />
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
                <MoveLeft
                  width={24}
                  height={24}
                  onClick={back}
                  className="cursor-pointer"
                />
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
            {isHiddenChatBox &&
            ticketDetails.ticket_type.toLowerCase() === "hacker" &&
            !ticketDetails.related_ticket_id ? null : (
              <div
                className={cn(
                  "sticky top-[8.15rem] z-30 w-full rounded-b-xl px-6 py-2",
                  "space-y-2 bg-neutral-light-70 dark:bg-neutral-dark-70"
                )}
              >
                <div className="_flexbox__row__center__between w-full">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-violet-light dark:text-violet-light"
                  >
                    {ticketDetails.ticket_type === "Hacker"
                      ? "Hacker"
                      : "Company"}{" "}
                    Ticket
                  </Typography>
                  {ticketDetails.ticket_type === "Hacker" ? (
                    ticketDetails.related_ticket_id ? (
                      <Link
                        href={`/reports/${ticketDetails.related_ticket_id}`}
                        className="underline"
                        replace
                      >
                        Go to Company Ticket
                      </Link>
                    ) : (
                      <Button
                        variant="ghost-default"
                        className="p-0"
                        onClick={() => setOpenModalForbidden(true)}
                      >
                        Create Company Ticket
                      </Button>
                    )
                  ) : (
                    <Link
                      href={`/reports/${ticketDetails.related_ticket_id}`}
                      className="underline"
                      replace
                    >
                      Go to Hacker Ticket
                    </Link>
                  )}
                </div>
                <Typography variant="p" affects="small">
                  This chat is read only on this device. Please access using
                  desktop to interact.
                </Typography>
              </div>
            )}
          </div>
          {isFetchingNextPage && (
            <Loader variant="hacker" width={12} height={12} className="h-12" />
          )}
          <div className="px-6 py-8">
            <ChatBubble
              ticket_type={ticketDetails.ticket_type}
              data={chatData ?? []}
            />
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
          <ModalForbidden
            variant="mediator"
            isOpen={openModalForbidden}
            onClose={() => setOpenModalForbidden(false)}
            title="Create Company Ticket"
            subtitle="Create Company Ticket only available on Desktop"
          />
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
                  onClick={back}
                  className="cursor-pointer"
                />
                <Typography variant="h5" weight="bold">
                  {`#${ticketDetails.code}: ${ticketDetails.title}`}
                </Typography>
                <button
                  type="button"
                  className="_flexbox__row__center gap-2.5"
                  onClick={() => setOpenModalSetRiskLevel(true)}
                >
                  <Badge
                    variant={
                      ticketDetails.risk_level_category.toLowerCase() as any
                    }
                    className="max-w-fit"
                  >
                    {`${ticketDetails.risk_level} | ${ticketDetails.risk_level_category}`}
                  </Badge>
                  <ChevronDown />
                </button>
              </div>
              <div className="_flexbox__row__center gap-3">
                {isPendingUpdate && !isRefetching ? (
                  <Loader
                    variant="mediator"
                    className="h-fit"
                    width={24}
                    height={40}
                    noText
                  />
                ) : (
                  <StatusDropdown
                    value={ticketDetails.status}
                    options={filterItems.status}
                    onValueChange={(v) => {
                      mutateUpdateTicket(`status=${v}`);
                    }}
                  />
                )}
              </div>
            </Card>
            <AnimationWrapper>
              {isHiddenChatBox &&
              ticketDetails.ticket_type.toLowerCase() === "hacker" &&
              !ticketDetails.related_ticket_id ? null : (
                <div
                  className={cn(
                    "sticky top-[8.15rem] z-30 w-full rounded-[10px] p-4",
                    "mb-4 bg-neutral-light-80 dark:bg-neutral-dark-80"
                  )}
                >
                  <div className="_flexbox__row__center__between w-full">
                    <Typography
                      variant="p"
                      affects="small"
                      className="text-violet-light dark:text-violet-light"
                    >
                      {ticketDetails.ticket_type === "Hacker"
                        ? "Hacker"
                        : "Company"}{" "}
                      Ticket
                    </Typography>
                    {ticketDetails.ticket_type === "Hacker" ? (
                      <Link
                        href={
                          ticketDetails.related_ticket_id
                            ? `/reports/${ticketDetails.related_ticket_id}`
                            : `/reports/new?ticket_id=${ticketDetails.id}`
                        }
                        className="underline"
                        replace
                      >
                        {ticketDetails.related_ticket_id
                          ? "Go to Company Ticket"
                          : "Create Company Ticket"}
                      </Link>
                    ) : (
                      <Link
                        href={`/reports/${ticketDetails.related_ticket_id}`}
                        className="underline"
                        replace
                      >
                        Go to Hacker Ticket
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </AnimationWrapper>
          </div>
          {isFetchingNextPage && (
            <Loader variant="hacker" width={12} height={12} className="h-12" />
          )}
          <ChatBubble
            ticket_type={ticketDetails.ticket_type}
            data={chatData ?? []}
          />
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
              variant="mediator"
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
        <ModalEditRiskLevel
          isManualRisk={isManualRisk}
          onChangeManualRisk={() => setIsManualRisk(!isManualRisk)}
          ticketId={id}
          cvss_string={ticketDetails.cvss_string}
          value={(chatData && chatData[0]?.chat_ticket?.risk_level) || 0}
          isOpen={openModalEditRiskLevel}
          onClose={() => setOpenModalSetRiskLevel(false)}
        />
      </Desktop>
      <div ref={chatRef}></div>
    </>
  );
};
export default ReportDetails;
