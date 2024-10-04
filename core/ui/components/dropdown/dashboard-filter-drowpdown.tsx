"use client";
import { Filter } from "lucide-react";
import BaseDropdown from "./base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import Separator from "../separator/separator";
import { Desktop, Mobile } from "../../layout";
import { ChatFilter } from "@/core/models/hacker/dashboard";
import { StoreType } from "@/core/hooks/types";
import { FilterDrawer } from "../drawer/filter-drawer";
import { useState } from "react";
import { I_GetParamsPayload } from "@/core/models/common";
import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { useTranslations } from "next-intl";

interface IDashboardFilterProps {
  variant?: "hacker" | "company" | "mediator";
  onValueChange?: (value: string, type: keyof typeof ChatFilter) => void;
  store?: StoreType;
}

const DashboardFilter = ({
  variant = "hacker",
  onValueChange = () => {},
  store,
}: IDashboardFilterProps) => {
  if (!store) return null;
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
              value={tempPayload?.params?.filter?.["program.type"] || "all"}
              options={filterItems.type}
              onValueChange={(v) => {
                setTempPayload({
                  ...tempPayload,
                  params: {
                    ...tempPayload.params,
                    filter: {
                      ...tempPayload.params?.filter,
                      ["program.type"]: v === "all" ? undefined : v,
                    },
                  },
                });
              }}
            />
            <Separator />
            <BaseDropdown
              variant={variant}
              label={t("risk_level")}
              value={tempPayload?.params?.filter?.level || "all"}
              options={filterItems.risk_level}
              onValueChange={(v) => {
                setTempPayload({
                  ...tempPayload,
                  params: {
                    ...tempPayload.params,
                    filter: {
                      ...tempPayload.params?.filter,
                      level: v === "all" ? undefined : v,
                    },
                  },
                });
              }}
            />
            <Separator />
            <BaseDropdown
              variant={variant}
              label={t("status")}
              value={tempPayload?.params?.filter?.status || "all"}
              options={filterItems.status}
              onValueChange={(v) => {
                setTempPayload({
                  ...tempPayload,
                  params: {
                    ...tempPayload.params,
                    filter: {
                      ...tempPayload.params?.filter,
                      status: v === "all" ? undefined : v,
                    },
                  },
                });
              }}
            />
          </div>
        </FilterDrawer>
      </Mobile>
      <Desktop className="w-fit">
        <div
          className={cn(
            "_flexbox__row__center__start rounded-lg",
            "bg-neutral-light-100 pl-3 dark:bg-neutral-dark-100"
          )}
        >
          <div className="_flexbox__row__center gap-2.5">
            <Filter className={iconColor[variant]} />
            <Separator
              orientation="vertical"
              className="h-6 w-0.5 text-white"
            />
          </div>
          <BaseDropdown
            label={t("type")}
            value={payload?.params?.filter?.["program.type"] || "all"}
            options={filterItems.type}
            onValueChange={(v) => onValueChange(v, "program.type")}
          />
          <BaseDropdown
            label={t("risk_level")}
            value={payload?.params?.filter?.level || "all"}
            options={filterItems.risk_level}
            onValueChange={(v) => onValueChange(v, "level")}
          />
          <BaseDropdown
            label={t("status")}
            value={payload?.params?.filter?.status || "all"}
            options={filterItems.status}
            onValueChange={(v) => onValueChange(v, "status")}
          />
        </div>
      </Desktop>
    </>
  );
};
export default DashboardFilter;
