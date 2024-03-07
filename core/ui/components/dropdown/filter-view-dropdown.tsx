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
import { Columns2, Grid2X2, Table2 } from "lucide-react";
import { Role } from "@/types/admin/sidebar";
import { cn } from "@/core/lib/utils";
import { useLocalStorage } from "usehooks-ts";

interface I_FilterViewDropdownProps extends InputProps {
  options: SortFilterType[];
  type: "hacker" | "company" | "mediator";
}

export const iconColor: { [key in Role]: string } = {
  hacker: "text-lime-normal",
  company: "text-sky-normal",
  mediator: "text-violet-normal",
};

const icons = (
  variant: "hacker" | "company" | "mediator",
  type: "card" | "table" | "grid"
) => {
  switch (type) {
    case "card":
      return <Columns2 className={cn("rotate-90", iconColor[variant])} />;
    case "table":
      return <Table2 className={iconColor[variant]} />;
    case "grid":
      return <Grid2X2 className={iconColor[variant]} />;
    default:
      return <Columns2 className={cn("rotate-90", iconColor[variant])} />;
  }
};

const FilterViewDropdown = ({
  options,
  type,
  ...props
}: I_FilterViewDropdownProps) => {
  const [view, setView] = useLocalStorage<"card" | "table" | "grid">(
    "view",
    "card"
  );

  const onValueChange = (value: string) => {
    setView(value as "card" | "table" | "grid");
  };

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="gap-2.5 !bg-white p-3 dark:!bg-neutral-dark-100">
        {icons(type, view)}
        <Typography
          variant="p"
          affects="normal"
          className="text-nowrap capitalize"
          transform="capitalize"
        >
          {view} View
        </Typography>
      </SelectTrigger>
      <SelectContent className="!bg-white dark:!bg-neutral-dark-100">
        {options.length! ? (
          options.map((option) => (
            <SelectItem key={option.value} value={option.value as string}>
              {icons(type, option.value as "card" | "table" | "grid")}
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
