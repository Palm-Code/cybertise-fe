import { borderColor, textColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetHasStripeAccountStatusResponse } from "@/core/models/payments";
import { Card, Indicator, Typography } from "@/core/ui/components";
import { Skeleton } from "@/core/ui/components/skeleton/skeleton";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";
import { ConnectStripeDialog } from "../../dialog";
import { useToggle } from "usehooks-ts";

interface I_EarningCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  data?: I_GetHasStripeAccountStatusResponse;
}

export const EarningCard = ({
  title,
  description,
  icon,
  data,
}: I_EarningCardProps) => {
  const [isOpenConnectStripeDialog, toggleConnectStripeDialog] = useToggle();
  const t = useTranslations("Earnings");
  const isConnected =
    data?.has_stripe_account && data?.has_completed_onboarding;
  return (
    <>
      <Card
        isClickable={isConnected}
        isButton={!isConnected}
        onClick={() => {
          if (!isConnected) {
            toggleConnectStripeDialog();
          }
        }}
        href={isConnected ? data.url : undefined}
        target="_blank"
      >
        <div className={cn("grid w-full grid-cols-1 gap-4 xl:gap-6")}>
          <div className={cn("flex w-full items-center justify-between")}>
            {icon}
            <Indicator variant={isConnected ? "closed" : "open"}>
              {isConnected ? t("status.connected") : t("status.not_connected")}
            </Indicator>
          </div>
          <div
            className={cn("flex w-full items-center justify-between gap-2.5")}
          >
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
          </div>
        </div>
      </Card>
      <ConnectStripeDialog
        url={data?.url ?? ""}
        open={isOpenConnectStripeDialog}
        onOpenChange={toggleConnectStripeDialog}
      />
    </>
  );
};

export const EarningCardSkeleton = () => {
  return (
    <Card>
      <div className={cn("grid w-full grid-cols-1 gap-4 xl:gap-6")}>
        <div className={cn("flex w-full items-center justify-between")}>
          <Skeleton className={cn("h-4 w-10")} />
          <Skeleton className={cn("h-4 w-12")} />
        </div>
        <div className={cn("flex w-full items-center justify-between gap-2.5")}>
          <div className={cn("flex w-full flex-col gap-4")}>
            <Skeleton className={cn("h-4 w-full")} />
            <Skeleton className={cn("h-8 w-full")} />
          </div>
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
