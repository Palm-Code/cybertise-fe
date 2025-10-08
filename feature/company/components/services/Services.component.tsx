import { cn } from "@/core/lib/utils";
import { Typography } from "@/core/ui/components";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { ServiceCardList } from "./card/service-card";
import { servicesList } from "../../constants/services";

export default function Services() {
  const t = useTranslations("Services");
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
        <ServiceCardList
          data={servicesList[locale as keyof typeof servicesList]}
        />
      </div>
    </div>
  );
}
