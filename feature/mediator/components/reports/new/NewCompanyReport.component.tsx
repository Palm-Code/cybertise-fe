"use client";
import { cn } from "@/core/lib/utils";
import { I_Data, I_GetChatListItemSuccessResponse } from "@/core/models/common";
import { Button, Card, Loader } from "@/core/ui/components";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { ChatBubble } from "@/feature/mediator/containers";
import Summary from "@/feature/mediator/containers/reports/details/type/Summary";
import { usePostCreateCompanyTicket } from "@/feature/mediator/query/client";
import { useGetChatListItem } from "@/feature/mediator/query/client/useGetChatListItem";
import { useReportDetailsParamStore } from "@/feature/mediator/zustand/store/reports";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NewCompanyReport = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("ticket_id");
  const store = useReportDetailsParamStore();
  const chatRef = useRef<HTMLDivElement>(null);

  const {
    data: chatData,
    isLoading,
    isFetching,
    isError,
  } = useGetChatListItem(store.payload, id as string, true);

  const { mutate, isPending, isSuccess } = usePostCreateCompanyTicket();
  const initialData =
    chatData && chatData.pages.flatMap((item) => item.data.map((item) => item));

  const [activeCard, setActiveCard] = useState<string | null>("chat");

  const handleCardClick = (category: string) => {
    setActiveCard((prevActiveCard) =>
      prevActiveCard === category ? null : category
    );
  };

  useEffect(() => {
    chatRef?.current?.scrollIntoView({ behavior: "instant" });
  }, [initialData]);

  if (isLoading || isFetching) return <Loader variant="mediator" />;

  if (isError || chatData?.pages.length === 0)
    return (
      <EmptyState
        variant="mediator"
        type="default"
        titleText="Chat Ticket not Found"
      />
    );

  return (
    <>
      <Mobile>
        <EmptyState variant="mediator" type="default" />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start min-h-full w-full gap-0 rounded-2xl">
          <div
            className={cn(
              "_flexbox__col__start__start sticky top-0 z-30",
              "h-fit w-full gap-3 bg-background-page-light pt-12 dark:bg-background-page-dark"
            )}
          >
            <Card className="rounded-2xl rounded-b-none xl:px-8 xl:py-6">
              <div
                className={cn(
                  typographyVariants({ variant: "h5", weight: "bold" }),
                  "inline-flex items-center gap-5"
                )}
              >
                <Button
                  asLink
                  href="/reports"
                  variant="tertiary-mediator"
                  prefixIcon={<X />}
                  className="p-0"
                />
                Create Company Ticket
              </div>
            </Card>
            <div
              className={cn(
                "sticky top-[8.15rem] z-30 h-4 w-full rounded-t-xl",
                "bg-background-main-light pt-0 dark:bg-background-main-dark"
              )}
            ></div>
          </div>
          <div className="_flexbox__row__start__start relative h-full w-full gap-6">
            <div className="h-full w-full overflow-y-auto">
              <Card
                className={cn(
                  "_flexbox__col__start__start h-full gap-6",
                  "overflow-y-auto rounded-b-xl rounded-t-none xl:px-8 xl:pb-12 xl:pt-8"
                )}
              >
                <Typography variant="h5" weight="bold">
                  {`#${chatData?.pages[0].data[0].chat_ticket?.code}: ${chatData?.pages[0].data[0].chat_ticket?.title}`}
                </Typography>
                {/* <div className="w-full">
                  <Card
                    isButton
                    className="_flexbox__col__start rounded-md bg-neutral-light-100 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-100"
                    onClick={() => handleCardClick("initial")}
                  >
                    <div
                      className={cn(
                        "_flexbox__row__center__between w-full gap-6 focus:outline-none active:outline-none",
                        "text-neutral-light-30 dark:text-neutral-dark-30"
                      )}
                    >
                      <Typography variant="p" affects="normal">
                        Hacker Ticket: Initial
                      </Typography>
                      <ChevronDown
                        className={cn(
                          "cursor-pointer transition-transform duration-300",
                          activeCard === "initial" ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </div>
                  </Card>
                  <AnimatePresence>
                    {activeCard === "initial" && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, marginTop: "0px" }}
                        animate={{ height: "auto", marginTop: "24px" }}
                        exit={{ height: 0, marginTop: "0" }}
                        transition={{ duration: 0.3 }}
                        className="w-full overflow-hidden"
                      >
                        <Card className="_flexbox__col__start rounded-md bg-neutral-light-100 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-100">
                          <Summary
                            ticket_type="Hacker"
                            data={initialChatTicket}
                          />
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div> */}
                <div className="w-full">
                  <Card
                    isButton
                    className="_flexbox__col__start rounded-md bg-neutral-light-100 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-100"
                    onClick={() => {
                      handleCardClick("chat");
                      chatRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div
                      className={cn(
                        "_flexbox__row__center__between w-full gap-6 focus:outline-none active:outline-none",
                        "text-neutral-light-30 dark:text-neutral-dark-30"
                      )}
                    >
                      <Typography variant="p" affects="normal">
                        Hacker Ticket: Chat
                      </Typography>
                      <ChevronDown
                        className={cn(
                          "cursor-pointer transition-transform duration-300",
                          activeCard === "chat" ? "rotate-180" : "rotate-0"
                        )}
                      />
                    </div>
                  </Card>
                  <AnimatePresence>
                    {activeCard === "chat" && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, marginTop: "0px" }}
                        animate={{ height: "auto", marginTop: "24px" }}
                        exit={{ height: 0, marginTop: "0" }}
                        transition={{ duration: 0.3 }}
                        className="w-full overflow-hidden"
                      >
                        <Card className="_flexbox__col__start__start max-h-96 overflow-auto rounded-md bg-neutral-light-100 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-100">
                          <ChatBubble data={initialData ?? []} />
                          <div ref={chatRef}></div>
                        </Card>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <Button
                  variant="primary-mediator"
                  isLoading={isPending}
                  disabled={isSuccess || isPending}
                  onClick={() => mutate(id as string)}
                >
                  Create Company Ticket
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </Desktop>
    </>
  );
};
export default NewCompanyReport;
