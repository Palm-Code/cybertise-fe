"use client";
import * as React from "react";
import { cn } from "@/core/lib/utils";
import { Eye, EyeOff, Info, X } from "lucide-react";
import Tooltip from "../tooltip/tooltip";
import { useOnClickOutside } from "usehooks-ts";
import Image from "next/image";
import Typography from "../typography/typography";
import { disableArrowKeys } from "@/utils/disable-arrow-number";
import { OnValueChange } from "react-number-format";
import CustomNumberFormat from "./price-format-input";

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
  description?: string;
  transparentBg?: boolean;
  isPrice?: boolean;
  onChangeNumberValue?: OnValueChange;
  containerClassName?: string;
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
      value,
      iconValue,
      description,
      transparentBg = false,
      isPrice = false,
      onChangeNumberValue,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [hasValue, setHasValue] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    useOnClickOutside(inputRef, () => {
      setIsFocused(false);
    });

    const onChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      onChange?.(e);
    };

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleBlur = () => {
      setIsFocused(false);
    };

    const onClickReveal = React.useMemo(() => {
      return () => {
        setHasValue(true);
        onClickRevealPassword?.();
      };
    }, [onClickRevealPassword]);

    return (
      <div
        className={cn("_flexbox__col__start w-full gap-1", containerClassName)}
      >
        <div
          className={cn(
            "relative z-10 flex h-16 w-full items-center justify-center rounded-md",
            isError && "border border-red-normal",
            transparentBg
              ? "bg-transparent"
              : "bg-neutral-light-90 px-4 dark:bg-neutral-dark-90"
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
                  className="mt-2 object-contain"
                />
              )}
              {isPrice ? (
                <CustomNumberFormat
                  value={value as number}
                  className={cn(
                    "absolute my-auto h-4 w-full bg-transparent text-neutral-light-0",
                    "peer appearance-none placeholder:text-neutral-light-40 dark:placeholder:text-neutral-dark-40",
                    "focus:outline-none focus:ring-0 dark:text-white"
                  )}
                  placeholder={isFocused ? placeholderText : " "}
                  onChange={onChangeValue}
                  onValueChange={onChangeNumberValue}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  disabled={props?.disabled || withTooltip}
                  onKeyDown={disableArrowKeys}
                />
              ) : (
                <input
                  className={cn(
                    "absolute my-auto h-7 w-full bg-transparent text-neutral-light-0",
                    "peer appearance-none placeholder:text-neutral-light-40 dark:placeholder:text-neutral-dark-40",
                    "focus:outline-none focus:ring-0 dark:text-white",
                    prefixIcon && "pl-4",
                    iconValue ? "top-0 pl-5" : "-top-1.5 pl-0",
                    !label && "bottom-1 h-16"
                    // props.type === "password" && hasValue
                    //   ? "text-3xl font-extrabold !leading-none placeholder:text-base placeholder:font-normal"
                    //   : "text-base font-normal"
                  )}
                  value={value}
                  placeholder={isFocused ? placeholderText : " "}
                  onChange={onChangeValue}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  autoComplete="new-password"
                  disabled={props?.disabled || withTooltip}
                  onKeyDown={disableArrowKeys}
                  {...props}
                  ref={ref}
                />
              )}
              {!!label && (
                <label
                  htmlFor={props.name}
                  className={cn(
                    "absolute transform text-sm text-neutral-light-30 duration-300 md:text-base dark:text-neutral-dark-30",
                    "-top-[14px] left-4 start-0 -z-10 origin-[0] scale-75 peer-focus:start-0",
                    "peer-focus:text-neutral-light-30 dark:peer-focus:text-neutral-dark-30 peer-focus:dark:text-neutral-dark-30",
                    "peer-placeholder-shown:-translate-y-[3px] peer-placeholder-shown:scale-100",
                    "peer-focus:scale-75",
                    "rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
                    prefixIcon && "start-4 peer-focus:start-4",
                    iconValue
                      ? "-translate-y-1 peer-focus:-translate-y-1"
                      : "-translate-y-3 peer-focus:-translate-y-3"
                  )}
                >
                  {label}
                </label>
              )}
            </div>
          </div>
          {(onClickRevealPassword &&
            hasValue &&
            (props.type === "password" ? (
              <Eye className="h-6 w-6 cursor-pointer" onClick={onClickReveal} />
            ) : (
              <EyeOff
                className="h-6 w-6 cursor-pointer"
                onClick={onClickReveal}
              />
            ))) ||
            null}
          {onClearInput && !onClickRevealPassword && hasValue && (
            <X
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                setHasValue(false);
                onClearInput();
              }}
            />
          )}
          {withTooltip && (
            <Tooltip content="This is a tooltip">
              <Info className="h-6 w-6" />
            </Tooltip>
          )}
          {suffixIcon}
        </div>
        {!!description && (
          <Typography variant="p" affects="tiny">
            {description}
          </Typography>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
