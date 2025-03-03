import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ChevronRight } from "lucide-react";
import React from "react";

interface I_ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export const ServiceCard = ({
  title,
  description,
  icon,
  href,
}: I_ServiceCardProps) => {
  return (
    <Card isClickable href={href} target="_blank">
      <div className={cn("grid w-full grid-cols-[auto_1fr] gap-4 xl:gap-9")}>
        <div
          className={cn(
            "h-fit rounded-full p-2 xl:p-3",
            "border border-sky-normal bg-sky-normal/30 *:text-sky-normal"
          )}
        >
          {icon}
        </div>
        <div className={cn("flex w-full items-center justify-between gap-2.5")}>
          <div className={cn("flex w-full flex-col gap-4")}>
            <Typography variant="h5" weight="bold">
              {title}
            </Typography>
            <Typography variant="p" affects="small">
              {description}
            </Typography>
          </div>
          <ChevronRight />
        </div>
      </div>
    </Card>
  );
};

export const ServiceCardList = ({ data }: { data: I_ServiceCardProps[] }) => {
  return data.map((item, index) => (
    <ServiceCard key={`service-card-${index}`} {...item} />
  ));
};
