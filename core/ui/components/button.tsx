import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap rounded-full text-base transition-colors py-3 px-6 gap-2.5 disabled:cursor-not-allowed disabled:text-neutral-50",
  {
    variants: {
      variant: {
        "primary-hacker":
          "border bg-lime-normal text-brand-neutral hover:bg-lime-darker active:bg-lime-dark border-lime-normal hover:border-lime-darker active:border-lime-dark disabled:bg-neutral-20 disabled:border-neutral-20",
        "secondary-hacker":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-lime-lighter-20/20 active:bg-lime-lighter-20/20 border-lime-normal hover:border-lime-normal active:border-lime-lighter-20/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-hacker":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-lime-normal active:text-lime-dark",
        "primary-company":
          "border bg-sky-normal text-white hover:bg-sky-lighter active:bg-sky-darker border-sky-normal hover:border-sky-lighter active:border-sky-darker disabled:bg-neutral-20 disabled:border-neutral-20",
        "secondary-company":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-sky-lighter/20 active:bg-sky-lighter/20 border-sky-normal hover:border-sky-normal active:border-sky-lighter/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-company":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-sky-normal active:text-sky-dark",
        "primary-mediator":
          "border bg-violet-normal text-white hover:bg-violet-lighter active:bg-violet-darker border-violet-normal hover:border-violet-lighter active:border-violet-darker disabled:bg-neutral-20 disabled:border-neutral-20",
        "secondary-mediator":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-violet-lighter/20 active:bg-violet-lighter/20 border-violet-normal hover:border-violet-normal active:border-violet-lighter/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-mediator":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-violet-normal active:text-violet-dark",
      },
    },
    defaultVariants: {
      variant: "primary-hacker",
    },
  }
);

export interface ButtonIconProps {
  postFixIcon?: React.ReactNode;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    ButtonIconProps {
  asChild?: boolean;
  fullWidth?: boolean;
  childern?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, childern, asChild = false, fullWidth, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, className }),
          fullWidth ? "w-full" : "w-fit"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
