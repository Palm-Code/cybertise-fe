import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import { ArrowUp, Coins } from "lucide-react";
import React from "react";
import { Wrapper } from "./Wrapper";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import MobileLayout from "@/core/ui/layout/wrapper/MobileLayout.wrapper";

interface I_OverviewCardProps {
  title: string;
  value: string;
  changes: number;
}

export const OverviewCard = ({
  title,
  value,
  changes,
}: I_OverviewCardProps) => {
  return (
    <>
      <MobileLayout className={cn("h-full")}>
        <Wrapper className={cn("h-full justify-between")}>
          <div className={cn("grid grid-cols-[auto_1fr] items-center gap-4")}>
            <Coins className={iconColor.hacker} />
            <Typography variant="p" affects="small" weight="semibold">
              {title}
            </Typography>
          </div>
          <div className={cn("flex w-full items-center justify-between")}>
            <p
              className={cn("text-2xl font-semibold")}
              dangerouslySetInnerHTML={{ __html: value }}
            />
            <div className={cn("grid grid-cols-[auto_1fr] items-center gap-2")}>
              <div
                className={cn("rounded-full bg-semantic-dark-success/10 p-1")}
              >
                <ArrowUp className={cn("size-3 text-semantic-dark-success")} />
              </div>
              <Typography
                variant="p"
                affects="small"
                weight="bold"
                className={cn(
                  "text-semantic-light-success dark:text-semantic-dark-success"
                )}
              >
                {changes} %
              </Typography>
            </div>
          </div>
        </Wrapper>
      </MobileLayout>
      <DesktopLayout>
        <Wrapper>
          <div className={cn("grid grid-cols-[auto_1fr] items-center gap-4")}>
            <Coins className={iconColor.hacker} />
            <Typography variant="p" affects="normal" weight="semibold">
              {title}
            </Typography>
          </div>
          <div className={cn("flex w-full items-center justify-between")}>
            <p
              className={cn("text-[40px] font-semibold")}
              dangerouslySetInnerHTML={{ __html: value }}
            />
            <div className={cn("grid grid-cols-[auto_1fr] items-center gap-2")}>
              <div
                className={cn("rounded-full bg-semantic-dark-success/10 p-1")}
              >
                <ArrowUp className={cn("size-4 text-semantic-dark-success")} />
              </div>
              <Typography
                variant="p"
                affects="normal"
                weight="bold"
                className={cn(
                  "text-semantic-light-success dark:text-semantic-dark-success"
                )}
              >
                {changes}
              </Typography>
            </div>
          </div>
        </Wrapper>
      </DesktopLayout>
    </>
  );
};
