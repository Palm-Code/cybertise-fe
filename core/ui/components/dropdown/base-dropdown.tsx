"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../select/select";
import { SortFilterType } from "@/types/admin/dashboard";
import Typography from "../typography/typography";
import { Desktop, Mobile } from "../../layout";
import Checkbox from "../checkbox/checkbox";
import { Role } from "@/types/admin/sidebar";

interface I_BaseDropdownProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value?: string;
  label?: string;
  variant?: keyof typeof Role;
}

const BaseDropdown = ({
  onValueChange,
  options,
  value,
  label = "Sort By",
  variant = "hacker",
  ...props
}: I_BaseDropdownProps) => {
  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-4.5">
          <Typography variant="h6" weight="semibold">
            {label}
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-4">
            {options &&
              options.map((option, idx) => (
                <div
                  key={`option-${idx}`}
                  className="_flexbox__row__center__between w-full"
                >
                  <Typography variant="p" affects="small">
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
        <Select onValueChange={onValueChange}>
          <SelectTrigger
            withIcon
            className="!w-fit !justify-start gap-4 whitespace-nowrap text-nowrap !bg-transparent"
          >
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
      </Desktop>
    </>
  );
};
export default BaseDropdown;
