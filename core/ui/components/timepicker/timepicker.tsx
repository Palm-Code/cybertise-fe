"use client";
import { cn } from "@/core/lib/utils";
import { generateTimeOptions } from "@/utils/time-options";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popopver/popover";
import { formatToUtcTimeString } from "@/utils/formatter/date-formatter";
import { useState } from "react";

interface I_SelectDropdownProps {
  onValueChange: (value: string) => void;
  value: string;
}

const SelectDropdown = ({ onValueChange, value }: I_SelectDropdownProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const options = generateTimeOptions();
  const currentTime = new Date();
  const defaultCurrentTime = `${currentTime.getHours()}:${currentTime.getMinutes().toFixed(0).padStart(2, "0")}`;

  const parseTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
  };

  return (
    <Popover
      open={openDropdown}
      onOpenChange={setOpenDropdown}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          title="Date"
          className={cn(
            "w-full rounded bg-neutral-light-90 px-4 py-4.5 text-start dark:bg-neutral-dark-90",
            "text-neutral-light-40 dark:text-neutral-dark-40",
            "_flexbox__row__center__between"
          )}
        >
          {value || defaultCurrentTime}
          <ChevronDown />
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          "z-[9999] h-64 w-full overflow-auto p-0",
          "bg-neutral-light-100 text-start dark:bg-neutral-dark-100"
        )}
        align="start"
      >
        {options.map((option, idx) => {
          const optionTime = parseTime(option.value);
          const isDisabled = optionTime < currentTime;

          return (
            <button
              key={`time-${idx}`}
              type="button"
              title="Date"
              className={cn(
                "w-full px-4 py-2 pr-6",
                "bg-neutral-light-100 text-start dark:bg-neutral-dark-100",
                "text-neutral-light-40 hover:bg-neutral-light-90 hover:text-sky-normal",
                "dark:text-neutral-dark-40 dark:hover:bg-neutral-dark-90",
                "_flexbox__row__center__between",
                "disabled:cursor-not-allowed disabled:!opacity-50",
                option.value.toString() === value &&
                  "bg-neutral-light-90 text-sky-normal dark:bg-neutral-dark-90 dark:text-sky-normal"
              )}
              onClick={() => {
                // if (isDisabled) return;
                onValueChange(option.value);
                setOpenDropdown(false);
              }}
              // disabled={isDisabled}
            >
              {option.label}
            </button>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};
export default SelectDropdown;
