"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../select/select";
import { InputProps } from "../input/input";
import { SortFilterType } from "@/types/admin/dashboard";
import Typography from "../typography/typography";
import { Columns2, Table2 } from "lucide-react";
import { Role } from "@/types/admin/sidebar";
import { cn } from "@/core/lib/utils";

interface I_FilterViewDropdownProps extends InputProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value: "card" | "table";
  type: "hacker" | "company" | "mediator";
}

const iconColor: { [key in Role]: string } = {
  hacker: "text-lime-normal",
  company: "text-sky-normal",
  mediator: "text-violet-normal",
};

const icons = (
  variant: "hacker" | "company" | "mediator",
  type: "card" | "table"
) => {
  switch (type) {
    case "card":
      return <Columns2 className={cn("rotate-90", iconColor[variant])} />;
    case "table":
      return <Table2 className={iconColor[variant]} />;
  }
};

const FilterViewDropdown = ({
  onValueChange,
  options,
  value,
  type,
  ...props
}: I_FilterViewDropdownProps) => {
  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="gap-2.5 !bg-white p-3 dark:!bg-neutral-dark-100">
        {icons(type, value)}
        <Typography variant="p" affects="normal">
          {inputValueLabel}
        </Typography>
      </SelectTrigger>
      <SelectContent className="!bg-white dark:!bg-neutral-dark-100">
        {options.length! ? (
          options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {icons(type, option.value as "card" | "table")}
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
export default FilterViewDropdown;
