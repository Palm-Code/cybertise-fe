import { cn } from "@/core/lib/utils";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import { useTranslations } from "next-intl";
import { parseAsInteger, useQueryState } from "nuqs";
import React from "react";

export const FilterStatistic = () => {
  const [interval, setInterval] = useQueryState(
    "interval",
    parseAsInteger.withDefault(0)
  );
  const t = useTranslations("Filter");
  return (
    <DesktopLayout className={cn("w-fit")}>
      <BaseDropdown
        triggerClassName="ml-3 bg-neutral-light-100 dark:bg-neutral-dark-100 border-[0.5px] border-neutral-light-60 dark:border-neutral-dark-60 rounded-md"
        label={t("showing_data_for")}
        value={interval.toString() ?? "7"}
        options={[
          { value: "7", label: "Last 7 Days" },
          { value: "30", label: "Last 30 Days" },
          { value: "90", label: "Last 90 Days" },
        ]}
        onValueChange={(v) => {
          setInterval(parseInt(v));
        }}
      />
    </DesktopLayout>
  );
};
