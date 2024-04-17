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
import { ChatBubble } from "@/feature/mediator/containers";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ModalSendAttachment from "../_dialog/ModalSendAttachment";
import { useRouter } from "next/navigation";

const ReportDetails = () => {
  const { back } = useRouter();
  const chatRef = useRef<HTMLDivElement>(null);
  const [openAttachment, setOpenAttachment] = useState<boolean>(false);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

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
                <button type="button" onClick={back} title="Back">
                  <MoveLeft width={24} height={24} />
                </button>
                <div className="grid gap-4">
                  <Typography variant="h5" weight="bold">
                    Report Title
                  </Typography>
                  <Badge variant={"medium"}>Medium</Badge>
                </div>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator variant="warning" />
                <Typography variant="p" affects="small" weight="medium">
                  Status
                </Typography>
              </div>
            </Card>
            <div
              className={cn(
                "sticky top-[8.15rem] z-30 w-full rounded-b-xl px-6 py-2",
                "bg-neutral-light-70 dark:bg-neutral-dark-70"
              )}
            >
              <div className="_flexbox__row__center__between w-full py-4">
                <Typography
                  variant="p"
                  affects="small"
                  className="text-violet-light dark:text-violet-light"
                >
                  Hacker Ticket
                </Typography>
                <Link href="#" className="underline">
                  Go to Company Ticket
                </Link>
              </div>
              <Typography variant="p" affects="small">
                This chat is read only on this device. Please access using
                desktop to interact.
              </Typography>
            </div>
          </div>
          <div className="px-6 py-8">
            <ChatBubble />
          </div>
          <div ref={chatRef}></div>
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
                <button type="button" onClick={back} title="Back">
                  <MoveLeft width={24} height={24} />
                </button>
                <Typography variant="h5" weight="bold">
                  Report Title
                </Typography>
                <Badge variant={"medium"}>Medium</Badge>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator variant="warning" />
                <Typography variant="p" affects="small" weight="medium">
                  Status
                </Typography>
              </div>
            </Card>
            <AnimationWrapper>
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
                    Hacker Ticket
                  </Typography>
                  <Link href="#" className="underline">
                    Go to Company Ticket
                  </Link>
                </div>
              </div>
            </AnimationWrapper>
          </div>
          <ChatBubble />
        </div>
        <Tiptap
          description=""
          onChangeValue={() => {}}
          variant="mediator"
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
