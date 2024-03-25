import { filterItems } from "@/core/constants/dashboard";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";

interface ISortByDropdownProps {
  variant?: "hacker" | "company" | "mediator";
}

const SortByDropdown = ({ variant = "hacker" }: ISortByDropdownProps) => {
  return (
    <BaseDropdown
      label="Sort By"
      value="latest"
      options={filterItems}
      onValueChange={() => {}}
    />
  );
};
export default SortByDropdown;
