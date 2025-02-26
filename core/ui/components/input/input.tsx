"use client";
import * as React from "react";
import { cn } from "@/core/lib/utils";
import { Eye, EyeOff, Info, TriangleAlert, X } from "lucide-react";
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
  isSelect?: boolean;
  errorMsg?: string;
  wrapperClassName?: string;
  onClickWarningIcon?: () => void;
  isBreached?: boolean;
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
      value,
      iconValue,
      description,
      transparentBg = false,
      isPrice = false,
      onChangeNumberValue,
      containerClassName,
      isSelect = false,
      errorMsg,
      wrapperClassName,
      onClickWarningIcon,
      isBreached = false,
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
        onClick={() => inputRef.current?.focus()}
        className={cn("_flexbox__col__start w-full gap-1", containerClassName)}
      >
        <div
          className={cn(
            "relative z-10 flex h-16 w-full items-center justify-center rounded-md",
            isError && "border border-red-normal",
            props.disabled && "cursor-not-allowed",
            transparentBg
              ? "bg-transparent"
              : "bg-neutral-light-90 dark:bg-neutral-dark-90",
            wrapperClassName
          )}
        >
          {prefixIcon}
          <div
            className="_flexbox__row__between relative h-full w-full"
            ref={inputRef}
          >
            <>
              {iconValue && (
                <Image
                  src={iconValue}
                  alt={label || " "}
                  width={24}
                  height={16}
                  className="ml-4 mt-4.5 h-4 w-6 object-contain"
                />
              )}
              {isPrice ? (
                <CustomNumberFormat
                  value={value as number}
                  className={cn(
                    "absolute my-auto w-full bg-transparent text-neutral-light-0 disabled:cursor-not-allowed",
                    "peer appearance-none px-4 placeholder:text-neutral-light-40 dark:placeholder:text-neutral-dark-40",
                    "inset-0 mt-0.5 h-20 focus:outline-none focus:ring-0 dark:text-white"
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
                    "absolute my-auto w-full bg-transparent text-neutral-light-0 disabled:cursor-not-allowed",
                    "peer appearance-none placeholder:mt-1 placeholder:text-sm placeholder:text-neutral-light-40 dark:placeholder:text-neutral-dark-40",
                    "inset-0 mt-0.5 h-full focus:outline-none focus:ring-0 dark:text-white",
                    prefixIcon && "pl-4",
                    iconValue ? "mt-2.5 pl-11" : "px-4",
                    !label && "!mt-0 !pt-0",
                    isSelect && "cursor-pointer",
                    isSelect && (!value || !!iconValue) ? "pt-0" : "pt-4",
                    className
                    // props.type === "password" && hasValue
                    //   ? "text-3xl font-extrabold !leading-none placeholder:text-base placeholder:font-normal"
                    //   : "text-base font-normal"
                  )}
                  id={`${props.id ?? label}`}
                  value={value ?? ""}
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
                  htmlFor={`${props.id ?? label}`}
                  className={cn(
                    "absolute transform text-sm text-neutral-light-30 duration-300 dark:text-neutral-dark-30 md:text-base",
                    "start-0 top-6 -z-10 origin-[0] scale-75 px-5 peer-focus:start-0 md:top-6",
                    "peer-focus:text-neutral-light-30 dark:peer-focus:text-neutral-dark-30 peer-focus:dark:text-neutral-dark-30",
                    "peer-placeholder-shown:-translate-y-[3px] peer-placeholder-shown:scale-100",
                    "peer-focus:scale-75",
                    "rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4",
                    prefixIcon && "start-4 peer-focus:start-4",
                    iconValue
                      ? "-translate-y-3 peer-focus:-translate-y-3"
                      : "-translate-y-3 peer-focus:-translate-y-3"
                  )}
                >
                  {label}
                </label>
              )}
            </>
          </div>
          {onClickWarningIcon && isBreached && (
            <TriangleAlert
              className="absolute right-12 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer text-warning"
              onClick={onClickWarningIcon}
            />
          )}
          {(onClickRevealPassword &&
            hasValue &&
            (props.type === "password" ? (
              <Eye
                className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer"
                onClick={onClickReveal}
              />
            ) : (
              <EyeOff
                className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer"
                onClick={onClickReveal}
              />
            ))) ||
            null}
          {onClearInput && !onClickRevealPassword && hasValue && (
            <X
              className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer"
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
          {!!suffixIcon && (
            <div className="absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 cursor-pointer">
              {suffixIcon}
            </div>
          )}
        </div>
        {!!description && (
          <Typography
            variant="p"
            affects="tiny"
          >
            {description}
          </Typography>
        )}
        {!!errorMsg && (
          <Typography
            variant="p"
            affects="tiny"
            className="!text-red-error"
          >
            {errorMsg}
          </Typography>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export default Input;
