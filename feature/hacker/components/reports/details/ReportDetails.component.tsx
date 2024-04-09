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
import { ChatBubble } from "@/feature/hacker/containers";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ModalSendAttachment from "../_dialog/ModalSendAttachment";

const ReportDetails = () => {
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
                <Link href="/reports">
                  <MoveLeft width={24} height={24} />
                </Link>
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
            <AnimationWrapper>
              <div
                className={cn(
                  "sticky top-[8.15rem] z-30 w-full rounded-b-xl px-6 py-2",
                  "bg-neutral-light-70 dark:bg-neutral-dark-70"
                )}
              >
                This chat is read only on this device. Please access using
                desktop to interact.
              </div>
            </AnimationWrapper>
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
                "z-30 w-full rounded-b-none rounded-t-2xl p-6"
              )}
            >
              <div className="_flexbox__row__center__start gap-5">
                <Link href="/reports">
                  <MoveLeft width={24} height={24} />
                </Link>
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
                  "sticky top-[8.15rem] z-30 h-4 w-full rounded-t-xl"
                )}
              ></div>
            </AnimationWrapper>
          </div>
          <ChatBubble />
          <div ref={chatRef}></div>
        </div>
        <Tiptap
          description=""
          onChangeValue={() => {}}
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
    </>
  );
};
export default ReportDetails;
