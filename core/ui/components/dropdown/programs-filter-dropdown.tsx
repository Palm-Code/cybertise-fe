import { Filter } from "lucide-react";
import { iconColor } from "./filter-view-dropdown";
import BaseDropdown from "./base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import Separator from "../separator/separator";

interface IProgramsFilterProps {
  variant?: "hacker" | "company" | "mediator";
}

const ProgramsFilter = ({ variant = "hacker" }: IProgramsFilterProps) => {
  return (
    <div className="_flexbox__row__center__start w-full gap-4 rounded-lg">
      <BaseDropdown
        label="Scope"
        value="All scope"
        options={filterItems.type}
        onValueChange={() => {}}
      />
      <BaseDropdown
        label="Asset type"
        value="All Asset"
        options={filterItems.asset_type}
        onValueChange={() => {}}
      />
    </div>
  );
};
export default ProgramsFilter;
