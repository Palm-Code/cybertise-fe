import { filterItems } from "@/core/constants/dashboard";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";

interface IProgramsFilterDropdownProps {
  variant?: "hacker" | "company" | "mediator";
}

const ProgramsFilterDropdown = ({
  variant = "hacker",
}: IProgramsFilterDropdownProps) => {
  return (
    <BaseDropdown
      label="Sort By"
      value="latest"
      options={filterItems}
      onValueChange={() => {}}
    />
  );
};
export default ProgramsFilterDropdown;
