"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../select/select";
import { SortFilterType } from "@/types/admin/dashboard";
import Typography from "../typography/typography";

interface I_BaseDropdownProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value: string;
  label?: string;
}

const BaseDropdown = ({
  onValueChange,
  options,
  value,
  label = "Sort By",
  ...props
}: I_BaseDropdownProps) => {
  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="!w-fit !justify-start gap-4 text-nowrap !bg-transparent !p-0">
        <Typography
          variant="p"
          affects="small"
          className="mr-1 text-neutral-light-30 dark:text-neutral-dark-30"
        >
          {label}
        </Typography>
        <Typography variant="p" affects="small">
          {inputValueLabel || "All type"}
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
export default BaseDropdown;
