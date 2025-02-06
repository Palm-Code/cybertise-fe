import { I_BaseDropdownProps } from "@/core/ui/components/dropdown/base-dropdown";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/core/ui/components/select/select";
import { Typography } from "@/core/ui/components";
import { cn } from "@/core/lib/utils";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import MobileLayout from "@/core/ui/layout/wrapper/MobileLayout.wrapper";
import { ChevronDown, Users } from "lucide-react";

export const Dropdown = ({
  onValueChange,
  options,
  value,
  label = "Sort By",
  variant = "hacker",
  triggerClassName,
  contentClassName,
  ...props
}: I_BaseDropdownProps) => {
  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;
  return (
    <>
      <MobileLayout className={cn("w-fit")}>
        <Select onValueChange={onValueChange} defaultValue={value}>
          <SelectTrigger
            className={cn(
              "ml-0 !w-fit !justify-start gap-2 whitespace-nowrap text-nowrap border-none !bg-transparent p-0",
              triggerClassName
            )}
            {...props}
          >
            <div className={cn("flex w-fit flex-shrink-0 items-center gap-2")}>
              {label && <Users />}
              <Typography variant="p" affects="normal">
                {value ?? 7}
              </Typography>
            </div>
          </SelectTrigger>
          <SelectContent
            className={cn(
              "!bg-white dark:!bg-neutral-dark-100",
              contentClassName
            )}
          >
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
      </MobileLayout>
      <DesktopLayout className={cn("w-fit")}>
        <Select onValueChange={onValueChange} defaultValue={value}>
          <div className={cn("flex flex-shrink-0 items-center gap-1")}>
            {label && (
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                {label}
              </Typography>
            )}
            <SelectTrigger
              withIcon
              className={cn(
                "!w-fit !justify-start gap-4 whitespace-nowrap text-nowrap !bg-transparent",
                triggerClassName
              )}
              {...props}
            >
              <Typography variant="p" affects="small">
                {inputValueLabel || "Last 7 Days"}
              </Typography>
            </SelectTrigger>
          </div>
          <SelectContent
            className={cn(
              "!bg-white dark:!bg-neutral-dark-100",
              contentClassName
            )}
          >
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
      </DesktopLayout>
    </>
  );
};
