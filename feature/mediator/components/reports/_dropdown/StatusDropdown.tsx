"use client";
import { Indicator } from "@/core/ui/components";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/core/ui/components/select/select";
import { Desktop } from "@/core/ui/layout";
import { SortFilterType } from "@/types/admin/dashboard";
import { ChevronDown } from "lucide-react";

interface I_StatusDropdownProps {
  onValueChange: (value: string) => void;
  options: SortFilterType[];
  value?: string;
  variant?: "hacker" | "company" | "mediator";
  withIcon?: boolean;
}

const StatusDropdown = ({
  onValueChange,
  options,
  value,
  variant = "hacker",
  withIcon,
  ...props
}: I_StatusDropdownProps) => {
  const slicedOptions = options.slice(1, options.length - 1);

  const inputValueLabel = slicedOptions.find(
    (option) => option.value === value
  )?.label;

  const inputValue = slicedOptions.find((option) => option.value === value)
    ?.value as string;

  return (
    <>
      <Desktop>
        <Select onValueChange={onValueChange}>
          <SelectTrigger className="gap-2.5 !bg-transparent !p-0">
            <Indicator
              variant={
                inputValue.toLowerCase() as keyof typeof indicatorVariants
              }
            >
              {inputValueLabel}
            </Indicator>
            <ChevronDown />
          </SelectTrigger>
          <SelectContent
            align="start"
            alignOffset={10}
            className="!bg-white dark:!bg-neutral-dark-100"
          >
            {options && slicedOptions.length! ? (
              slicedOptions.map((option) => (
                <SelectItem key={option.value} value={option.value as string}>
                  <Indicator
                    variant={
                      option.value
                        .toString()
                        .toLowerCase() as keyof typeof indicatorVariants
                    }
                  >
                    {option.label}
                  </Indicator>
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
export default StatusDropdown;
