"use client";
import { Filter } from "lucide-react";
import { iconColor } from "./filter-view-dropdown";
import BaseDropdown from "./base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import Separator from "../separator/separator";
import { Desktop, Mobile } from "../../layout";
import Typography from "../typography/typography";
import { cn } from "@/core/lib/utils";
import { ChatFilter } from "@/core/models/hacker/dashboard";
import { StoreType } from "@/core/hooks/types";

interface IDashboardFilterProps {
  variant?: "hacker" | "company" | "mediator";
  onValueChange?: (value: string, type: keyof typeof ChatFilter) => void;
  store: StoreType;
}

const DashboardFilter = ({
  variant = "hacker",
  onValueChange = () => {},
  store,
}: IDashboardFilterProps) => {
  const { payload } = store;
  return (
    <>
      <Mobile className="w-fit">
        <div
          className={cn(
            "min-w-32",
            "_flexbox__row__center__start gap-2.5 rounded-lg",
            "bg-neutral-light-100 px-3 py-2 dark:bg-neutral-dark-100"
          )}
        >
          <Filter className={iconColor[variant]} />
          <Typography variant="p" affects="small">
            Filter
          </Typography>
        </div>
      </Mobile>
      <Desktop className="w-fit">
        <div className="_flexbox__row__center__start gap-2.5 rounded-lg bg-neutral-light-100 pl-3 dark:bg-neutral-dark-100">
          <Filter className={iconColor[variant]} />
          <Separator orientation="vertical" className="h-6 w-0.5 text-white" />
          <BaseDropdown
            label="Type"
            value={payload?.params?.filter?.["program.type"] || "all"}
            options={filterItems.type}
            onValueChange={(v) => onValueChange(v, "program.type")}
          />
          <BaseDropdown
            label="Risk Level"
            value={payload?.params?.filter?.level || "all"}
            options={filterItems.risk_level}
            onValueChange={(v) => onValueChange(v, "level")}
          />
          <BaseDropdown
            label="Status"
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
