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
import { Desktop, Mobile } from "../../layout";
import { iconColor } from "@/core/constants/common";
import { Role } from "@/types/admin/sidebar";

interface I_FilterDropdownProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value?: string;
  variant?: keyof typeof Role;
  withIcon?: boolean;
}

const FilterDropdown = ({
  onValueChange,
  options,
  value,
  variant = "hacker",
  withIcon,
  ...props
}: I_FilterDropdownProps) => {
  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  return (
    <>
      <Mobile className="w-fit">
        <Select onValueChange={onValueChange} defaultValue={value}>
          <SelectTrigger
            className="justify-start gap-2.5 !bg-white dark:!bg-neutral-dark-100"
            withIcon={withIcon}
          >
            <ArrowUpDown
              className={iconColor[variant]}
              width={20}
              height={20}
            />
            <Typography
              variant="p"
              affects="small"
              className="whitespace-nowrap text-nowrap"
            >
              {inputValueLabel || "Sort By"}
            </Typography>
            <div></div>
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
      </Mobile>
      <Desktop className="w-fit">
        <Select onValueChange={onValueChange} defaultValue={value}>
          <SelectTrigger className="gap-2.5 !bg-white dark:!bg-neutral-dark-100">
            <ArrowUpDown className={iconColor[variant]} />
            <Typography
              variant="p"
              affects="small"
              className="whitespace-nowrap text-nowrap"
            >
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
      </Desktop>
    </>
  );
};
export default FilterDropdown;
