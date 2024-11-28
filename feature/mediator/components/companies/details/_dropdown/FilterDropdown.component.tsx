import { iconColor } from "@/core/constants/common";
import { ticketReportedOptions } from "@/core/constants/options";
import { StoreType } from "@/core/hooks";
import { cn } from "@/core/lib/utils";
import { I_GetParamsPayload } from "@/core/models/common";
import { useGetAssetType } from "@/core/react-query/client";
import { FilterDrawer, Separator } from "@/core/ui/components";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { Desktop, Mobile } from "@/core/ui/layout";
import { Filter } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

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
  const { payload, setPayload } = store;
  const [tempPayload, setTempPayload] = useState<I_GetParamsPayload>(payload);
  return (
    <>
      <Mobile className="w-fit">
        <FilterDrawer
          variant={"mediator"}
          onSubmitFilter={() => setPayload(tempPayload)}
        >
          <div className="_flexbox__col__start__start w-full gap-6">
            <BaseDropdown
              variant="mediator"
              contentClassName={(isModal && "z-[99999]") || ""}
              label={t("asset_type")}
              value={
                (assetType?.find(
                  (item) =>
                    item.id === tempPayload?.params?.filter?.has_asset_type
                )?.value as string) || "all"
              }
              options={assetType}
              onValueChange={(v) => {
                setTempPayload({
                  ...tempPayload,
                  params: {
                    ...tempPayload.params,
                    filter: {
                      ...tempPayload.params?.filter,
                      has_asset_type:
                        v === "all"
                          ? undefined
                          : assetType?.find((_) => _.value === v)?.id,
                    },
                  },
                });
              }}
            />
            <Separator />
            <BaseDropdown
              variant="mediator"
              contentClassName={(isModal && "z-[99999]") || ""}
              label={t("ticket_reported")}
              value={tempPayload.params?.filter?.valid_report_size ?? "all"}
              options={ticketReportedOptions}
              onValueChange={(v) => {
                setTempPayload({
                  ...tempPayload,
                  params: {
                    ...tempPayload.params,
                    filter: {
                      ...tempPayload.params?.filter,
                      valid_report_size: v === "all" ? undefined : v,
                    },
                  },
                });
              }}
            />
          </div>
        </FilterDrawer>
      </Mobile>
      <Desktop>
        <div className="grid w-fit grid-cols-[auto_1fr] items-center gap-2.5 rounded-md bg-neutral-light-100 pl-3 dark:bg-neutral-dark-100">
          <div className="flex items-center gap-2.5">
            <Filter className={cn(iconColor.mediator)} />
            <Separator
              orientation="vertical"
              className="h-6 w-0.5 text-white"
            />
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
              onValueChange={(v) => {
                onValueChange("has_asset_type", v);
              }}
            />
            <BaseDropdown
              contentClassName={(isModal && "z-[99999]") || ""}
              label={t("ticket_reported")}
              value={payload.params?.filter?.valid_report_size ?? "all"}
              options={ticketReportedOptions}
              onValueChange={(v) => {
                onValueChange("valid_report_size", v);
              }}
            />
          </div>
        </div>
      </Desktop>
    </>
  );
};
