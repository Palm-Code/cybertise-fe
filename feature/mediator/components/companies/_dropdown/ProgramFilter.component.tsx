import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";

interface IProgramsFilterDropdownProps {
  variant?: "hacker" | "company" | "mediator";
}

const ProgramsFilterDropdown = ({
  variant = "hacker",
}: IProgramsFilterDropdownProps) => {
  return (
    <div className="_flexbox__row__center__start w-full gap-4 rounded-lg">
      <BaseDropdown
        label="Status"
        value="All assets type"
        options={filterItems.type}
        onValueChange={() => {}}
      />
    </div>
  );
};
export default ProgramsFilterDropdown;
