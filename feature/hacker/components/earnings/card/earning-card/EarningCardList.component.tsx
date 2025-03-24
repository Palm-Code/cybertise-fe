import { borderColor, textColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ChevronRight } from "lucide-react";
import React from "react";

interface I_EarningCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export const EarningCard = ({
  title,
  description,
  icon,
}: I_EarningCardProps) => {
  return (
    <Card
      isClickable
      href={"https://stripe.com"}
      target="_blank"
    >
      <div className={cn("grid w-full grid-cols-[auto_1fr] gap-4 xl:gap-9")}>
        <div
          className={cn(
            "h-fit rounded-full p-2 xl:p-3",
            borderColor.hacker,
            textColor.hacker
          )}
        >
          {icon}
        </div>
        <div className={cn("flex w-full items-center justify-between gap-2.5")}>
          <div className={cn("flex w-full flex-col gap-4")}>
            <Typography
              variant="h5"
              weight="bold"
            >
              {title}
            </Typography>
            <Typography
              variant="p"
              affects="small"
            >
              {description}
            </Typography>
          </div>
          <ChevronRight />
        </div>
      </div>
    </Card>
  );
};

export const EarningCardList = ({ data }: { data: I_EarningCardProps[] }) => {
  return data.map((item, index) => (
    <EarningCard
      key={`service-card-${index}`}
      {...item}
    />
  ));
};
