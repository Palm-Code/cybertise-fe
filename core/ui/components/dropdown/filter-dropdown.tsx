"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../select/select";
import { InputProps } from "../input/input";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { SortFilterType } from "@/types/admin/dashboard";
import Typography from "../typography/typography";

interface I_FilterDropdownProps extends InputProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value: string;
}

const FilterDropdown = ({
  onValueChange,
  options,
  value,
  ...props
}: I_FilterDropdownProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);

  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  const optionsFilter = options.filter((option) =>
    option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="gap-1.5 !bg-transparent pl-0">
        <Typography variant="p" affects="small">
          {inputValueLabel}
        </Typography>
      </SelectTrigger>
      <SelectContent className="!bg-white dark:!bg-neutral-dark-100">
        {optionsFilter.length! ? (
          optionsFilter.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))
        ) : (
          <SelectItem value="no items" disabled>
            No options
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );
};
export default FilterDropdown;
