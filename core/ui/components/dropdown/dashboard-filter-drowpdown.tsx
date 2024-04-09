import { Filter } from "lucide-react";
import { iconColor } from "./filter-view-dropdown";
import BaseDropdown from "./base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import Separator from "../separator/separator";
import { Desktop, Mobile } from "../../layout";
import Typography from "../typography/typography";
import { cn } from "@/core/lib/utils";

interface IDashboardFilterProps {
  variant?: "hacker" | "company" | "mediator";
}

const DashboardFilter = ({ variant = "hacker" }: IDashboardFilterProps) => {
  return (
    <>
      <Mobile className="w-fit">
        <div
          className={cn(
            "min-w-28",
            "_flexbox__row__center__start gap-2.5 rounded-lg",
            "bg-neutral-light-100 px-3 py-2 dark:bg-neutral-dark-100"
          )}
        >
          <Filter className={iconColor[variant]} />
          <Typography variant="p" affects="small">
            Filter
          </Typography>
          {/* <Separator orientation="vertical" className="h-6 w-0.5 text-white" />
          <BaseDropdown
            label="Type"
            value="All type"
            options={filterItems.type}
            onValueChange={() => {}}
          />
          <BaseDropdown
            label="Risk Level"
            value="All Level"
            options={filterItems.risk_level}
            onValueChange={() => {}}
          />
          <BaseDropdown
            label="Status"
            value="All status"
            options={filterItems.status}
            onValueChange={() => {}}
          /> */}
        </div>
      </Mobile>
      <Desktop className="w-fit">
        <div className="_flexbox__row__center__start gap-2.5 rounded-lg bg-neutral-light-100 pl-3 dark:bg-neutral-dark-100">
          <Filter className={iconColor[variant]} />
          <Separator orientation="vertical" className="h-6 w-0.5 text-white" />
          <BaseDropdown
            label="Type"
            value="All type"
            options={filterItems.type}
            onValueChange={() => {}}
          />
          <BaseDropdown
            label="Risk Level"
            value="All Level"
            options={filterItems.risk_level}
            onValueChange={() => {}}
          />
          <BaseDropdown
            label="Status"
            value="All status"
            options={filterItems.status}
            onValueChange={() => {}}
          />
        </div>
      </Desktop>
    </>
  );
};
export default DashboardFilter;
