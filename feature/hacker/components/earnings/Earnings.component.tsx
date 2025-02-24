import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { earningsList } from "@/feature/hacker/constants/earnings";
import { EarningCardList } from "./card/earning-card";

export default function Earnings() {
  const t = useTranslations("Earnings");
  const locale = useLocale();
  return (
    <div className={cn("flex w-full flex-col gap-10")}>
      <Typography
        variant="h5"
        weight="bold"
      >
        {t("title")}
      </Typography>
      <div className={cn("grid w-full gap-10 xl:grid-cols-2")}>
        <EarningCardList
          data={earningsList[locale as keyof typeof earningsList]}
        />
      </div>
    </div>
  );
}
