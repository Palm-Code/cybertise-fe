"use client";
import * as React from "react";

import { cn } from "@/core/lib/utils";
import { Eye, Info, X } from "lucide-react";
import Tooltip from "./tooltip";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  withTooltip?: boolean;
  onClearInput?: () => void;
  label?: string;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      prefixIcon,
      suffixIcon,
      label,
      onChange,
      onClearInput,
      withTooltip = false,
      isError = false,
      ...props
    },
    ref
  ) => {
    const [showX, setShowX] = React.useState(false);
    const [isFocused, setIsFocused] = React.useState(false);

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setShowX(e.target.value !== "");
      onChange?.(e);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    return (
      <div
        className={cn(
          "relative z-10 flex h-16 w-full items-center justify-center rounded-md bg-neutral-90 px-4",
          isError && "border border-red-normal"
        )}
      >
        {prefixIcon}
        <div className="relative top-1 w-full">
          <input
            className={cn(
              "absolute -top-2 my-auto w-full bg-transparent text-base text-gray-900",
              "peer appearance-none placeholder:text-neutral-40 focus:outline-none focus:ring-0 dark:text-white",
              prefixIcon && "pl-4"
            )}
            placeholder={isFocused ? "Placeholder" : ""}
            onChange={onChangeValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            disabled={props?.disabled || withTooltip}
            {...props}
            ref={ref}
          />
          <label
            htmlFor={props.name}
            className={cn(
              "absolute transform text-base text-neutral-30 duration-300",
              "-top-[14px] left-4 start-0 -z-10 origin-[0] -translate-y-2 scale-75 peer-focus:start-0",
              "peer-focus:text-neutral-30 peer-focus:dark:text-neutral-30",
              "peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100",
              "peer-focus:-translate-y-2.5 peer-focus:scale-75",
              "rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
              prefixIcon && "start-4 peer-focus:start-4"
            )}
          >
            {label}
          </label>
        </div>
        {showX &&
          (props.type === "password" ? (
            <Eye className="h-6 w-6 cursor-pointer" />
          ) : (
            <X className="h-6 w-6 cursor-pointer" onClick={onClearInput} />
          ))}
        {withTooltip && (
          <Tooltip content="This is a tooltip">
            <Info className="h-6 w-6" />
          </Tooltip>
        )}
        {suffixIcon}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
