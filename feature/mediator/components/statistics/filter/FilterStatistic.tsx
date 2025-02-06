import { cn } from "@/core/lib/utils";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import { useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";
import { Dropdown } from "./Dropdown";
import { filterItems } from "@/feature/mediator/constants/dashboard";

export const FilterStatistic = () => {
  const [interval, setInterval] = useQueryState(
    "interval",
    parseAsInteger.withDefault(0)
  );
  const t = useTranslations("Filter");
  return (
    <Dropdown
      triggerClassName="xl:ml-3 bg-neutral-light-100 dark:bg-neutral-dark-100 border-[0.5px] border-neutral-light-60 dark:border-neutral-dark-60 rounded-md"
      label={t("showing_data_for")}
      value={interval.toString()}
      options={[
        { value: "7", label: t("days", { days: 7 }) },
        { value: "30", label: t("days", { days: 30 }) },
        { value: "90", label: t("days", { days: 90 }) },
      ]}
      onValueChange={(v) => {
        setInterval(parseInt(v));
      }}
    />
  );
};
