import { CheckIcon } from "lucide-react";
import { BaseCheckbox, BaseCheckboxProps } from "./base-checkbox";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";

export const checkboxVariants = cva(
  "border-2 border-transparent disabled:bg-opacity-20 bg-neutral-light-80 dark:bg-neutral-dark-80",
  {
    variants: {
      variant: {
        hacker:
          "text-brand-neutral data-[state=checked]:bg-lime-normal-light dark:data-[state=checked]:bg-lime-normal-dark data-[state=checked]:border-lime-normal-light dark:data-[state=checked]:border-lime-normal-dark hover:border-lime-normal-light dark:hover:border-lime-normal-dark focus:border-2 focus:border-lime-normal-light dark:focus:border-lime-normal-dark disabled:bg-lime-light",
        company:
          "text-white data-[state=checked]:bg-sky-normal data-[state=checked]:border-sky-normal hover:border-sky-normal focus:border-2 focus:border-sky-normal disabled:bg-sky-light",
        "company staff":
          "text-white data-[state=checked]:bg-sky-normal dark:data-[state=checked]:bg-sky-normal data-[state=checked]:border-sky-normal dark:data-[state=checked]:border-sky-normal hover:border-sky-normal dark:hover:border-sky-normal focus:border-2 focus:border-sky-normal dark:focus:border-sky-normal disabled:bg-sky-light",
        mediator:
          "text-white data-[state=checked]:bg-violet-normal dark:data-[state=checked]:bg-violet-normal data-[state=checked]:border-violet-normal dark:data-[state=checked]:border-violet-normal hover:border-violet-normal dark:hover:border-violet-normal focus:border-2 focus:border-violet-normal dark:focus:border-violet-normal disabled:bg-violet-light",
      },
    },
    defaultVariants: {
      variant: "hacker",
    },
  }
);

export interface CheckboxProps
  extends BaseCheckboxProps,
    VariantProps<typeof checkboxVariants> {}

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <BaseCheckbox
        ref={ref}
        className={checkboxVariants({ variant, className })}
        {...props}
      >
        <CheckIcon className="size-full" />
      </BaseCheckbox>
    );
  }
);
export default Checkbox;
