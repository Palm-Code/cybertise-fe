"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../command/command";
import { Popover, PopoverContent, PopoverTrigger } from "../popopver/popover";
import { cn } from "@/core/lib/utils";
import Input, { InputProps } from "../input/input";
import { OptionsType } from "@/types/auth/sign-up";
import Image from "next/image";
import Typography from "../typography/typography";
import Separator from "../separator/separator";

interface I_SelectDropdownProps extends InputProps {
  onValueChange: (value: string) => void;
  placeholder?: string;
  options: Array<OptionsType & { group: string }>;
  value: string;
  withIcon?: boolean;
  withSearch?: boolean;
}

export default function SelectGroupDropdown({
  onValueChange,
  options,
  value,
  withIcon = false,
  withSearch = false,
  ...props
}: I_SelectDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const inputValueLabel = options.find(
    (option) => option.value === value
  )?.label;

  const groupedData = options.reduce(
    (result: { [key: string]: OptionsType[] }, item) => {
      if (!result[item.group]) {
        result[item.group] = [];
      }
      result[item.group].push(item);
      return result;
    },
    {}
  );

  const iconValue = options.find((option) => option.value === value)?.icon;

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger className={cn("_flexbox__row__center__between w-full")}>
        <Input
          label={inputValueLabel ? props.label : undefined}
          placeholder={props.label || " "}
          iconValue={withIcon ? iconValue : undefined}
          className={cn(
            "-top-0.5 placeholder:text-neutral-light-30 dark:placeholder:text-neutral-dark-30",
            props.transparentBg && "!bg-transparent",
            props.className
          )}
          wrapperClassName={props.wrapperClassName}
          readOnly
          value={inputValueLabel}
          isSelect
          suffixIcon={<ChevronDown />}
        />
      </PopoverTrigger>
      <PopoverContent
        className="max-w-80 overflow-auto bg-neutral-light-90 !p-0 dark:bg-neutral-dark-90 md:max-w-full"
        align="start"
      >
        <Command className="flex flex-col gap-2 !bg-transparent">
          {withSearch && <CommandInput placeholder="Search..." />}
          <CommandList>
            <CommandEmpty>No data found</CommandEmpty>
            <CommandGroup>
              {Array.from(Object.entries(groupedData)).map((item, idx) => (
                <div
                  key={`group-${idx}`}
                  className="_flexbox__col__start__start px-4"
                >
                  <div
                    className={cn(
                      "relative flex w-full select-none items-center gap-3",
                      "rounded-sm py-2 pl-2 pr-8 text-base outline-none",
                      "opacity-50",
                      "dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
                    )}
                  >
                    <Typography
                      variant="p"
                      affects="normal"
                      transform="capitalize"
                    >
                      {Object.keys(groupedData)[idx]}
                    </Typography>
                  </div>
                  {groupedData[Object.keys(groupedData)[idx]].map((v) => (
                    <CommandItem
                      className={cn(
                        "relative flex w-full cursor-default select-none items-center gap-1",
                        "rounded-sm px-6 py-1.5 text-base outline-none hover:cursor-pointer",
                        "focus:bg-neutral-100 focus:text-neutral-900",
                        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
                        "dark:focus:bg-neutral-800 dark:focus:text-neutral-50"
                      )}
                      key={v.value}
                      value={v.label as string}
                      onSelect={(currentValue) => {
                        const values = options.find(
                          (option) =>
                            option.label.toLowerCase() ===
                            currentValue.toLowerCase()
                        )?.value as string;
                        onValueChange(values === value ? "" : values);
                        setIsOpen(false);
                      }}
                      disabled={v.value === value}
                    >
                      {withIcon && (
                        <Image
                          src={v.icon ?? ""}
                          alt={v.label}
                          width={24}
                          height={16}
                          className="h-4 w-6 object-contain"
                        />
                      )}
                      {v.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value &&
                            value.toLowerCase() ===
                              v.value.toString().toLowerCase()
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </div>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
