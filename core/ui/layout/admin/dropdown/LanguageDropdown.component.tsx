"use client";
import { SortFilterType } from "@/types/admin/dashboard";
import { Role } from "@/types/admin/sidebar";
import { cn } from "@/core/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectTriggerProps,
} from "@/core/ui/components/select/select";
import { Typography } from "@/core/ui/components";
import { ChevronDown } from "lucide-react";

interface I_BaseDropdownProps extends SelectTriggerProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value?: string;
  label?: string;
  variant?: keyof typeof Role;
  triggerClassName?: string;
}

const LanguageDropdown = ({
  onValueChange,
  options,
  value,
  label = "Sort By",
  variant = "hacker",
  triggerClassName,
  ...props
}: I_BaseDropdownProps) => {
  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  return (
    <>
      <Select
        onValueChange={onValueChange}
        defaultValue={value}
      >
        <SelectTrigger
          className={cn(
            "!w-fit !justify-start gap-4 whitespace-nowrap text-nowrap !bg-transparent",
            triggerClassName
          )}
          {...props}
        >
          {label && (
            <Typography
              variant="p"
              affects="small"
              className="mr-1 text-neutral-light-30 dark:text-neutral-dark-30"
            >
              {label}
            </Typography>
          )}
          <div className="flex w-full items-center justify-between gap-2">
            <Typography
              variant="p"
              affects="small"
              className="text-sm"
            >
              {inputValueLabel || "EN"}
            </Typography>
            <ChevronDown className="size-5 md:size-6" />
          </div>
        </SelectTrigger>
        <SelectContent className="!bg-white dark:!bg-neutral-dark-100">
          {options.length! ? (
            options.map((option) => (
              <SelectItem
                key={option.value}
                value={option.value as string}
              >
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem
              value="no items"
              disabled
            >
              No options
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </>
  );
};
export default LanguageDropdown;
