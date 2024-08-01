"use client";

import * as React from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "../popopver/popover";
import { cn } from "@/core/lib/utils";
import { Calendar } from "../calendar/calendar";
import { ChevronDown } from "lucide-react";

export function DatePicker({
  value,
  onChangeValue,
}: {
  value: string;
  onChangeValue: (value: Date | undefined) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(
    value ? new Date(value) : undefined
  );
  const [openDropdown, setOpenDropdown] = React.useState(false);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    <Popover open={openDropdown} onOpenChange={setOpenDropdown}>
      <PopoverTrigger asChild>
        <button
          type="button"
          title="Date"
          className={cn(
            "w-full rounded-md bg-neutral-light-90 px-4 py-4.5 text-start dark:bg-neutral-dark-90",
            "text-neutral-light-40 dark:text-neutral-dark-40",
            "_flexbox__row__center__between"
          )}
        >
          {date ? format(date, "yyyy-MM-dd") : "Date"}
          <ChevronDown />
        </button>
      </PopoverTrigger>
      <PopoverContent className="z-[9999] w-full p-0" align="start">
        <Calendar
          mode="single"
          showOutsideDays
          selected={date}
          onSelect={(e) => {
            onChangeValue(e);
            setDate(e);
            setOpenDropdown(false);
          }}
          disabled={(date) => date < yesterday}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
