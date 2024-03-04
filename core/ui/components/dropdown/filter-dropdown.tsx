"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../select/select";
import { SortFilterType } from "@/types/admin/dashboard";
import Typography from "../typography/typography";
import { ArrowUpDown } from "lucide-react";
import { iconColor } from "./filter-view-dropdown";

interface I_FilterDropdownProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value: string;
  variant?: "hacker" | "company" | "mediator";
}

const FilterDropdown = ({
  onValueChange,
  options,
  value,
  variant = "hacker",
  ...props
}: I_FilterDropdownProps) => {
  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="gap-2.5 !bg-white dark:!bg-neutral-dark-100">
        <ArrowUpDown className={iconColor[variant]} />
        <Typography variant="p" affects="small">
          {inputValueLabel || "Sort By"}
        </Typography>
      </SelectTrigger>
      <SelectContent className="!bg-white dark:!bg-neutral-dark-100">
        {options.length! ? (
          options.map((option) => (
            <SelectItem key={option.value} value={option.value as string}>
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
