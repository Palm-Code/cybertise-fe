"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../select/select";
import Image from "next/image";
import { OptionsType } from "@/types/auth/sign-up";
import Input, { InputProps } from "../input/input";
import { cn } from "@/core/lib/utils";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";

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
  const [debounceValue] = useDebounceValue(searchValue, 500);
  const iconValue = options.find((option) => option.value === value)?.icon;

  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const optionsFilter = options.filter((option) =>
    option.label.toLowerCase().includes(debounceValue.toLowerCase())
  );

  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger
        className={cn(
          "pl-0 xl:p-0",
          props.transparentBg && "!bg-transparent",
          props.className,
          props.wrapperClassName
        )}
        withIcon
      >
        <Input
          iconValue={withIcon ? iconValue : undefined}
          readOnly
          disabled
          value={inputValueLabel}
          isSelect
          {...props}
        />
      </SelectTrigger>
      <SelectContent>
        {withSearch && (
          <>
            <div className="sticky top-0 z-20 w-full bg-neutral-light-90 pb-2 dark:bg-neutral-dark-90">
              <input
                value={searchValue}
                type="text"
                placeholder="Search..."
                className={cn(
                  "bg-neutral-light-80 dark:bg-neutral-dark-80",
                  "flex w-full items-center justify-center rounded-md px-4 py-[18px] outline-none"
                )}
                onChange={onChangeSearch}
              />
            </div>
            <div className="sticky -top-2 z-10 h-2 w-full bg-neutral-light-90 dark:bg-neutral-dark-90"></div>
          </>
        )}
        {optionsFilter.length! ? (
          optionsFilter.map((option) => (
            <SelectItem key={option.value} value={option.value as string}>
              {withIcon && (
                <Image
                  src={option.icon ?? ""}
                  alt={option.label}
                  width={24}
                  height={16}
                  className="object-cover"
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
