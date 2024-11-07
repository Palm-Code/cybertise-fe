import { iconColor } from "@/core/constants/common";
import { ticketReportedOptions } from "@/core/constants/options";
import { StoreType } from "@/core/hooks";
import { cn } from "@/core/lib/utils";
import { useGetAssetType } from "@/core/react-query/client";
import { Separator } from "@/core/ui/components";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type I_FilterDropdownProps = {
  store: StoreType;
  onValueChange?: (
    type: "valid_report_size" | "has_asset_type",
    value: string
  ) => void;
  isModal?: boolean;
};

export const FilterDropdown = ({
  store,
  onValueChange = () => {},
  isModal = false,
}: I_FilterDropdownProps) => {
  const t = useTranslations("Filter");
  const { data: assetType } = useGetAssetType();
  const { payload } = store;
  return (
    <div className="grid grid-cols-[auto_1fr] items-center rounded-md bg-neutral-light-100 pl-3 dark:bg-neutral-dark-100">
      <div className="flex items-center gap-2.5">
        <Filter className={cn(iconColor.mediator)} />
        <Separator orientation="vertical" className="h-6 w-0.5 text-white" />
      </div>
      <div className="flex items-center">
        <BaseDropdown
          contentClassName={(isModal && "z-[99999]") || ""}
          label={t("asset_type")}
          value={
            assetType?.find(
              (item) => item.id === payload?.params?.filter?.has_asset_type
            )?.value as string
          }
          options={assetType}
          onValueChange={(value) => {
            onValueChange("has_asset_type", value);
          }}
        />
        <BaseDropdown
          contentClassName={(isModal && "z-[99999]") || ""}
          label={t("ticket_reported")}
          value={payload.params?.filter?.valid_report_size ?? "all"}
          options={ticketReportedOptions}
          onValueChange={(value) => {
            onValueChange("valid_report_size", value);
          }}
        />
      </div>
    </div>
  );
};
