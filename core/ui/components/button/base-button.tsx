import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center whitespace-nowrap transition-colors gap-2.5 disabled:cursor-not-allowed disabled:text-neutral-light-50 disabled:dark:text-neutral-dark-50",
  {
    variants: {
      variant: {
        "primary-hacker":
          "border bg-lime-normal-light dark:bg-lime-normal-dark text-white dark:text-brand-neutral hover:bg-lime-darker-light hover:dark:bg-lime-darker-dark active:bg-lime-dark-light active:dark:bg-lime-dark-dark border-lime-normal-light dark:border-lime-normal-dark hover:border-lime-darker-light dark:hover:border-lime-darker-dark focus:border-lime-darker-light dark:focus:border-lime-darker-dark active:border-lime-dark-light active:dark:border-lime-dark-dark disabled:bg-lime-dark-light disabled:dark:bg-lime-dark-dark disabled:border-lime-dark-light/20 disabled:dark:border-lime-dark-dark/20 disabled:bg-opacity-20",
        "secondary-hacker":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-lime-lighter/20 focus:bg-lime-lighter/20 active:bg-lime-lighter/20 border-lime-normal-light dark:border-lime-normal-dark hover:border-lime-normal-light dark:hover:border-lime-normal-dark active:border-lime-lighter/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-hacker":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-lime-normal-light dark:hover:text-lime-normal-dark focus:text-lime-normal-light dark:focus:text-lime-normal-dark active:text-lime-dark-light active:dark:text-lime-dark-dark",
        "primary-company":
          "border bg-sky-normal text-white hover:bg-sky-lighter focus:bg-sky-lighter active:bg-sky-darker border-sky-normal hover:border-sky-lighter active:border-sky-darker disabled:bg-sky-dark disabled:border-sky-dark/20 disabled:bg-opacity-20",
        "secondary-company":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-sky-lighter/20 focus:bg-sky-lighter/20 active:bg-sky-lighter/20 border-sky-normal hover:border-sky-normal active:border-sky-lighter/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-company":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-sky-normal focus:text-sky-normal active:text-sky-dark",
        "primary-mediator":
          "border bg-violet-normal text-white hover:bg-violet-lighter focus:bg-violet-lighter active:bg-violet-darker border-violet-normal hover:border-violet-lighter active:border-violet-darker disabled:bg-violet-dark disabled:border-violet-dark/20 disabled:bg-opacity-20",
        "secondary-mediator":
          "border bg-transparent text-brand-neutral dark:text-white hover:bg-violet-lighter/20 focus:bg-violet-lighter/20 active:bg-violet-lighter/20 border-violet-normal hover:border-violet-normal active:border-violet-lighter/20 disabled:bg-transparent disabled:border-brand-neutral disabled:dark:border-white",
        "tertiary-mediator":
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-violet-normal focus:text-violet-normal active:text-violet-dark",
        default:
          "border-none bg-transparent text-brand-neutral dark:text-white hover:text-brand-neutral focus:text-brand-neutral active:text-brand-neutral",
        "outline-hacker":
          "border border-neutral-light-80 bg-transparent dark:border-neutral-dark-80 hover:bg-lime-normal-light dark:hover:bg-lime-normal-dark hover:text-neutral-light-0",
        "outline-company":
          "border border-neutral-light-80 bg-transparent dark:border-neutral-dark-80 hover:bg-sky-normal dark:text-white text-neutral-light-0 hover:text-white",
        "outline-mediator":
          "border border-neutral-light-80 bg-transparent dark:border-neutral-dark-80 hover:bg-violet-normal dark:text-white text-neutral-light-0 hover:text-white",
        "ghost-hacker":
          "bg-transparent text-lime-normal-light dark:text-lime-normal-dark hover:text-lime-dark-light hover:dark:text-lime-dark-dark focus:text-lime-dark-light focus:dark:text-lime-dark-dark active:text-lime-darker-light active:dark:text-lime-darker-dark",
        "ghost-mediator":
          "bg-transparent text-violet-normal hover:text-violet-dark focus:text-violet-dark active:text-violet-darker",
        "ghost-company":
          "bg-transparent text-sky-normal hover:text-sky-dark focus:text-sky-dark active:text-sky-darker",
        alert:
          "border bg-semantic-light-critical/10 dark:bg-semantic-dark-critical/10 text-semantic-light-critical dark:text-semantic-dark-critical border-semantic-light-critical dark:border-semantic-dark-critica hover:bg-semantic-light-critical/20 dark:hover:bg-semantic-dark-critical/20 focus:bg-semantic-light-critical/20 dark:focus:bg-semantic-dark-critical/20 active:bg-semantic-light-critical/20 dark:active:bg-semantic-dark-critical/20",
      },
      size: {
        default: "h-9 px-4 py-2 text-sm",
        ghost: "w-auto h-auto px-0 py-0",
        lg: "py-3 px-6 md:text-base text-sm",
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
