import { filterItems } from "@/core/constants/dashboard";
import BaseDropdown from "@/core/ui/components/dropdown/base-dropdown";
import { SortFilterType } from "@/types/admin/dashboard";

interface IFilterProps {
  label?: string;
  onValueChange?: (value: string) => void;
  value?: string;
  options?: SortFilterType[];
}

const Filter = ({ label, onValueChange, value, options }: IFilterProps) => {
  return (
    <BaseDropdown
      label={label ?? "Sort By"}
      value={value ?? "All type"}
      options={options ?? filterItems}
      onValueChange={onValueChange ?? (() => {})}
    />
  );
};
export default Filter;
