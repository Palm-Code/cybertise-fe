import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import { ArrowUp, Coins } from "lucide-react";
import React from "react";
import { Wrapper } from "./Wrapper";

interface I_OverviewCardProps {
  title: string;
  value: number;
  changes: number;
}

export const OverviewCard = ({
  title,
  value,
  changes,
}: I_OverviewCardProps) => {
  return (
    <Wrapper>
      <div className={cn("grid grid-cols-[auto_1fr] items-center gap-4")}>
        <Coins className={iconColor.hacker} />
        <Typography variant="p" affects="normal" weight="semibold">
          {title}
        </Typography>
      </div>
      <div className={cn("flex w-full items-center justify-between")}>
        <Typography variant="p" className={cn("text-[40px]")} weight="medium">
          {value}
        </Typography>
        <div className={cn("grid grid-cols-[auto_1fr] items-center gap-2")}>
          <div className={cn("rounded-full bg-semantic-dark-success/10 p-1")}>
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
  );
};
