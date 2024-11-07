"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/core/ui/components/select/select";
import { SortFilterType } from "@/types/admin/dashboard";
import Typography from "@/core/ui/components/typography/typography";
import { ArrowUpDown } from "lucide-react";
import { Desktop, Mobile } from "@/core/ui/layout";
import { iconColor } from "@/core/constants/common";
import { Role } from "@/types/admin/sidebar";
import { cn } from "@/core/lib/utils";

interface I_SortDropdownProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value?: string;
  variant?: keyof typeof Role;
  withIcon?: boolean;
  isModal?: boolean;
}

const SortDropdown = ({
  onValueChange,
  options,
  value,
  variant = "hacker",
  withIcon,
  isModal = false,
  ...props
}: I_SortDropdownProps) => {
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
              {inputValueLabel}
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
              {inputValueLabel}
            </Typography>
          </SelectTrigger>
          <SelectContent
            className={cn(
              "!bg-white dark:!bg-neutral-dark-100",
              isModal && "z-[99999]"
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
      </Desktop>
    </>
  );
};
export default SortDropdown;
