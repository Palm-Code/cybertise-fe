import { cn } from "@/core/lib/utils";
import { SelectDropdown, Typography } from "@/core/ui/components";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import { useTranslations } from "next-intl";
import React from "react";

export const FilterStatistic = () => {
  const t = useTranslations("Filter");
  return (
    <DesktopLayout className={cn("w-fit")}>
      <BaseDropdown
        triggerClassName="ml-3 bg-neutral-light-100 dark:bg-neutral-dark-100 border-[0.5px] border-neutral-light-60 dark:border-neutral-dark-60 rounded-md"
        label={t("showing_data_for")}
        value="Last 7 Days"
        options={[
          { value: "Last 7 Days", label: "Last 7 Days" },
          { value: "Last 30 Days", label: "Last 30 Days" },
          { value: "Last 90 Days", label: "Last 90 Days" },
        ]}
        onValueChange={() => {}}
      />
    </DesktopLayout>
  );
};
