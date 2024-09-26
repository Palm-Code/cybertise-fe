"use client";
import { StoreType } from "@/core/hooks";
import { I_GetParamsPayload } from "@/core/models/common";
import { FilterDrawer, Separator } from "@/core/ui/components";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { Desktop, Mobile } from "@/core/ui/layout";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import { SortFilterType } from "@/types/admin/dashboard";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface IProgramsFilterDropdownProps {
  variant?: "hacker" | "company" | "mediator";
  store: StoreType;
  assetTypeOptions?: SortFilterType[];
  onValueChange: (value: string, type: "type" | "has_asset_type") => void;
}

const ProgramsFilterDropdown = ({
  variant = "hacker",
  store,
  assetTypeOptions = [],
  onValueChange = () => {},
}: IProgramsFilterDropdownProps) => {
  const t = useTranslations("Filter");
  const { payload, setPayload } = store;
  const [tempPayload, setTempPayload] = useState<I_GetParamsPayload>(payload);

  return (
    <>
      <Mobile className="w-fit">
        <FilterDrawer
          variant={variant}
          onSubmitFilter={() => setPayload(tempPayload)}
        >
          <div className="_flexbox__col__start__start w-full gap-6">
            <BaseDropdown
              variant={variant}
              label={t("type")}
              value={tempPayload?.params?.filter?.["type"] || "all"}
              options={filterItems.type}
              onValueChange={(v) => {
                setTempPayload({
                  ...tempPayload,
                  params: {
                    ...tempPayload.params,
                    filter: {
                      ...tempPayload.params?.filter,
                      type: v === "all" ? undefined : v,
                    },
                  },
                });
              }}
            />
            <Separator />
            <BaseDropdown
              variant={variant}
              label={t("asset_type")}
              value={
                (assetTypeOptions?.find(
                  (item) =>
                    item.id === tempPayload?.params?.filter?.has_asset_type
                )?.value as string) || "all"
              }
              options={assetTypeOptions}
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
                          : assetTypeOptions?.find((_) => _.value === v)?.id,
                    },
                  },
                });
              }}
            />
          </div>
        </FilterDrawer>
      </Mobile>
      <Desktop className="w-fit">
        <div className="_flexbox__row__center__start w-full gap-4 rounded-lg">
          <BaseDropdown
            label={t("type")}
            value={payload?.params?.filter?.type as string}
            options={filterItems.type}
            onValueChange={(v) => onValueChange(v, "type")}
          />
          <BaseDropdown
            label={t("asset_type")}
            value={
              assetTypeOptions?.find(
                (item) => item.id === payload?.params?.filter?.has_asset_type
              )?.value as string
            }
            options={assetTypeOptions}
            onValueChange={(v) => {
              const id = assetTypeOptions?.find((_) => _.value === v)
                ?.id as string;
              onValueChange(id, "has_asset_type");
            }}
          />
        </div>
      </Desktop>
    </>
  );
};
export default ProgramsFilterDropdown;
