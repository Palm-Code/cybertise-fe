"use client";
import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import { useTranslations } from "next-intl";
import React from "react";
import { EarningCard, EarningCardSkeleton } from "./card/earning-card";
import { Stripe } from "@/core/ui/icons";
import { useGetHasStripeAccount } from "../../query/client";

export default function Earnings() {
  const t = useTranslations("Earnings");
  const { data: hasStripeAccount, isLoading } = useGetHasStripeAccount();

  return (
    <div className={cn("flex w-full flex-col gap-10")}>
      <Typography
        variant="h5"
        weight="bold"
      >
        {t("title")}
      </Typography>
      <div className={cn("grid w-full gap-10 xl:grid-cols-2")}>
        {isLoading ? (
          <EarningCardSkeleton />
        ) : (
          <EarningCard
            title={t("title")}
            description={t("description")}
            icon={<Stripe />}
            data={hasStripeAccount}
          />
        )}
      </div>
    </div>
  );
}
