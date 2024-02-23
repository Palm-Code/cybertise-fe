"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../select/select";
import Image from "next/image";
import { OptionsType } from "@/types/auth/sign-up";
import { Input, InputProps } from "../input/input";
import { cn } from "@/core/lib/utils";
import { useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";

interface I_SelectDropdownProps extends InputProps {
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: OptionsType[];
  value: string;
  withIcon?: boolean;
  withSearch?: boolean;
}

const SelectDropdown = ({
  onValueChange,
  options,
  value,
  withIcon = false,
  withSearch = false,
  ...props
}: I_SelectDropdownProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchTerm = useDebounce(searchValue, 300);
  const iconValue = options.find((option) => option.value === value)?.icon;

  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const optionsFilter = options.filter((option) =>
    option.label.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="pl-0">
        <Input
          iconValue={withIcon ? iconValue : undefined}
          readOnly
          value={inputValueLabel}
          {...props}
        />
      </SelectTrigger>
      <SelectContent>
        {withSearch && (
          <input
            value={searchValue}
            type="text"
            placeholder="Search..."
            className={cn(
              "sticky top-0 z-10 bg-neutral-light-80 dark:bg-neutral-dark-80",
              "flex w-full items-center justify-center rounded-md px-4 py-[18px] outline-none"
            )}
            onChange={onChangeSearch}
          />
        )}
        {optionsFilter.length! ? (
          optionsFilter.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {withIcon && (
                <Image
                  src={option.icon}
                  alt={option.label}
                  width={24}
                  height={16}
                />
              )}
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
export default SelectDropdown;
