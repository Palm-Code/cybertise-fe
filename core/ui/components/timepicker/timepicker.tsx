"use client";
import { cn } from "@/core/lib/utils";
import { useState } from "react";
import { generateTimeOptions } from "@/utils/time-options";
import { ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../popopver/popover";

interface I_SelectDropdownProps {
  onValueChange: (value: string) => void;
  value: string;
}

const SelectDropdown = ({ onValueChange, value }: I_SelectDropdownProps) => {
  const options = generateTimeOptions();
  const [selectedTime, setSelectedTime] = useState(value);

  return (
    <Popover>
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
          {selectedTime || "Time"}
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
                "_flexbox__row__center__between"
              )}
              onClick={() => {
                setSelectedTime(option.value);
                onValueChange(option.value);
              }}
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
