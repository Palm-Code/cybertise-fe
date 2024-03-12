import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap transition-colors gap-2.5 disabled:cursor-not-allowed disabled:text-neutral-50",
  {
    variants: {
      variant: {
        "primary-hacker":
          "border bg-lime-normal !text-brand-neutral hover:bg-lime-darker active:bg-lime-dark border-lime-normal hover:border-lime-darker focus:border-lime-darker active:border-lime-dark disabled:bg-lime-dark disabled:border-lime-dark disabled:opacity-20",
        "secondary-hacker":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-lime-lighter/20 focus:bg-lime-lighter/20 active:bg-lime-lighter/20 border-lime-normal hover:border-lime-normal active:border-lime-lighter-20/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-hacker":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-lime-normal focus:text-lime-normal active:text-lime-dark",
        "primary-company":
          "border bg-sky-normal text-white hover:bg-sky-lighter focus:bg-sky-lighter active:bg-sky-darker border-sky-normal hover:border-sky-lighter active:border-sky-darker disabled:bg-sky-dark disabled:border-sky-dark disabled:opacity-20",
        "secondary-company":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-sky-lighter/20 focus:bg-sky-lighter/20 active:bg-sky-lighter/20 border-sky-normal hover:border-sky-normal active:border-sky-lighter/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-company":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-sky-normal focus:text-sky-normal active:text-sky-dark",
        "primary-mediator":
          "border bg-violet-normal text-white hover:bg-violet-lighter focus:bg-violet-lighter active:bg-violet-darker border-violet-normal hover:border-violet-lighter active:border-violet-darker disabled:bg-violet-dark disabled:border-violet-dark disabled:opacity-20",
        "secondary-mediator":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-violet-lighter/20 focus:bg-violet-lighter/20 active:bg-violet-lighter/20 border-violet-normal hover:border-violet-normal active:border-violet-lighter/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-mediator":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-violet-normal focus:text-violet-normal active:text-violet-dark",
        default:
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-brand-neutral focus:text-brand-neutral active:text-brand-neutral",
        "outline-hacker":
          "border border-neutral-light-80 bg-transparent dark:border-neutral-dark-80 hover:bg-lime-normal hover:text-neutral-light-0",
        "outline-company":
          "border border-neutral-light-80 bg-transparent dark:border-neutral-dark-80 hover:bg-sky-normal dark:text-white text-neutral-light-0 hover:text-white",
        "outline-mediator":
          "border border-neutral-light-80 bg-transparent dark:border-neutral-dark-80 hover:bg-violet-normal dark:text-white text-neutral-light-0 hover:text-white",
        "ghost-hacker":
          "bg-transparent text-lime-normal hover:text-lime-dark focus:text-lime-dark active:text-lime-darker",
        "ghost-mediator":
          "bg-transparent text-violet-normal hover:text-violet-dark focus:text-violet-dark active:text-violet-darker",
        "ghost-company":
          "bg-transparent text-sky-normal hover:text-sky-dark focus:text-sky-dark active:text-sky-darker",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        ghost: "w-auto h-auto px-0 py-0",
        lg: "py-3 px-6 text-base",
        icon: "h-9 w-9",
      },
      radius: {
        default: "rounded-full",
        none: "rounded-lg",
      },
    },
    defaultVariants: {
      radius: "default",
      size: "lg",
      variant: "default",
    },
  }
);

export interface BaseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, BaseButtonProps>(
  (
    { className, variant, size, radius, asChild = false, fullWidth, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, radius, className }),
          fullWidth ? "w-full" : "w-fit"
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button as BaseButton, buttonVariants };
