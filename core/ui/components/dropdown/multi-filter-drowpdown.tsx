import { Filter } from "lucide-react";
import { iconColor } from "./filter-view-dropdown";
import { Separator } from "../separator";
import BaseDropdown from "./base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";

interface IMultiFilterDropdownProps {
  variant?: "hacker" | "company" | "mediator";
}

const MultiFilterDropdown = ({
  variant = "hacker",
}: IMultiFilterDropdownProps) => {
  return (
    <div className="_flexbox__row__center__start gap-2.5 rounded-lg bg-neutral-light-100 px-3 dark:bg-neutral-dark-100">
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
  );
};
export default MultiFilterDropdown;
