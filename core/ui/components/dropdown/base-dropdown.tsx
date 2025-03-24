"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectTriggerProps,
} from "../select/select";
import { SortFilterType } from "@/types/admin/dashboard";
import Typography from "../typography/typography";
import { Desktop, Mobile } from "../../layout";
import Checkbox from "../checkbox/checkbox";
import { Role } from "@/types/admin/sidebar";
import { cn } from "@/core/lib/utils";

export interface I_BaseDropdownProps extends SelectTriggerProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value?: string;
  label?: string;
  variant?: keyof typeof Role;
  triggerClassName?: string;
  contentClassName?: string;
}

const BaseDropdown = ({
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
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-4.5">
          <Typography
            variant="h6"
            weight="semibold"
          >
            {label}
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-4">
            {options &&
              options.map((option, idx) => (
                <div
                  key={`option-${idx}`}
                  className="_flexbox__row__center__between w-full"
                >
                  <Typography
                    variant="p"
                    affects="small"
                  >
                    {option.label}
                  </Typography>
                  <Checkbox
                    variant={variant}
                    checked={value === option.value}
                    onCheckedChange={() => {
                      onValueChange(option.value as string);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </Mobile>
      <Desktop className="w-fit">
        <Select
          onValueChange={onValueChange}
          defaultValue={value}
        >
          <div className={cn("flex items-center gap-1")}>
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
              <Typography
                variant="p"
                affects="small"
              >
                {inputValueLabel || "All type"}
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
      </Desktop>
    </>
  );
};
export default BaseDropdown;
