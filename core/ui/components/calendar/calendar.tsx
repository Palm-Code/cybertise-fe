"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/core/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { buttonVariants } from "../button/base-button";
import { Role } from "@/types/admin/sidebar";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  variant?: keyof typeof Role;
};

function Calendar({
  className,
  classNames,
  variant = "company",
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      className={cn(
        "rounded-md bg-neutral-light-100 p-3 dark:bg-neutral-dark-100",
        className
      )}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: `outline-${variant}` }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-neutral-500 rounded-md w-8 font-normal text-[0.8rem] dark:text-neutral-400",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-transparent [&:has([aria-selected].day-outside)]:bg-neutral-100/50 [&:has([aria-selected].day-range-end)]:rounded-r-md dark:[&:has([aria-selected])]:bg-transparent",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          "h-8 w-8 p-0 font-normal rounded-full hover:bg-sky-lighter dark:text-white text-neutral-900",
          "hover:text-white dark:hover:text-white"
        ),
        day_today: cn(
          "rounded-full w-8 h-8 p-0 !text-white",
          "border border-sky-lighter"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected: cn(
          "rounded-full w-8 h-8 p-0 !text-white",
          "bg-sky-lighter"
        ),
        day_outside: "!text-opacity-50",
        day_disabled: "!text-neutral-light-50 opacity-50",
        day_range_middle:
          "aria-selected:bg-neutral-100 aria-selected:text-neutral-900 dark:aria-selected:bg-neutral-800 dark:aria-selected:text-neutral-50",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
