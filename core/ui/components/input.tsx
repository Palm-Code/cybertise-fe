"use client";
import * as React from "react";
import { cn } from "@/core/lib/utils";
import { Eye, EyeOff, Info, X } from "lucide-react";
import Tooltip from "./tooltip";
import { useClickAway } from "@uidotdev/usehooks";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  prefixIcon?: React.ReactNode;
  suffixIcon?: React.ReactNode;
  withTooltip?: boolean;
  onClearInput?: () => void;
  onClickRevealPassword?: () => void;
  label?: string;
  isError?: boolean;
  placeholderText?: string;
  iconValue?: string;
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
      onClickRevealPassword,
      withTooltip = false,
      isError = false,
      placeholderText,
      defaultValue,
      iconValue,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = useClickAway<HTMLDivElement>(() => {
      setIsFocused(false);
    });

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(e);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const onClickReveal = () => {
      handleFocus();
      onClickRevealPassword?.();
    };

    return (
      <div
        className={cn(
          "relative z-10 flex h-16 w-full items-center justify-center rounded-md bg-neutral-90 px-4",
          isError && "border border-red-normal"
        )}
      >
        {prefixIcon}
        <div
          className="_flexbox__row__between relative top-1 w-full"
          ref={inputRef}
        >
          <div>
            {iconValue && (
              <Image
                src={iconValue}
                alt={label || " "}
                width={24}
                height={16}
                className="relative -top-[2px]"
              />
            )}
            <input
              className={cn(
                "absolute -top-2 my-auto h-6 w-full bg-transparent text-gray-900",
                "peer appearance-none placeholder:text-neutral-40 focus:outline-none focus:ring-0 dark:text-white",
                prefixIcon && "pl-4",
                iconValue && "pl-5",
                props.type === "password"
                  ? "text-3xl font-bold"
                  : "text-base font-normal"
              )}
              placeholder={isFocused ? placeholderText : " "}
              onChange={onChangeValue}
              onFocus={handleFocus}
              onBlur={handleBlur}
              autoComplete="new-password"
              disabled={props?.disabled || withTooltip}
              {...props}
              ref={ref}
            />
            <label
              htmlFor={props.name}
              className={cn(
                "absolute transform text-base text-neutral-30 duration-300",
                "-top-[14px] left-4 start-0 -z-10 origin-[0] -translate-y-3 scale-75 peer-focus:start-0",
                "peer-focus:text-neutral-30 peer-focus:dark:text-neutral-30",
                "peer-placeholder-shown:-translate-y-[3px] peer-placeholder-shown:scale-100",
                "peer-focus:-translate-y-3 peer-focus:scale-75",
                "rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
                prefixIcon && "start-4 peer-focus:start-4"
              )}
            >
              {label}
            </label>
          </div>
        </div>
        {(onClickRevealPassword &&
          (props.type === "password" ? (
            <Eye className="h-6 w-6 cursor-pointer" onClick={onClickReveal} />
          ) : (
            <EyeOff
              className="h-6 w-6 cursor-pointer"
              onClick={onClickReveal}
            />
          ))) ||
          null}
        {onClearInput && !onClickRevealPassword && (
          <X className="h-6 w-6 cursor-pointer" onClick={onClearInput} />
        )}
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
