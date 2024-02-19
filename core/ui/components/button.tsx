import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const buttonVariants = cva(
  "min-w-25 inline-flex items-center justify-center whitespace-nowrap rounded-full text-base transition-colors py-3 px-6 gap-2.5",
  {
    variants: {
      variant: {
        "primary-hacker":
          "border bg-lime-normal text-brand-neutral hover:bg-lime-darker active:bg-lime-dark border-lime-normal hover:border-lime-darker active:border-lime-dark",
        "secondary-hacker":
          "border bg-transparent text-white hover:bg-lime-lighter-20/20 active:bg-lime-lighter-20/20 border-lime-normal hover:border-lime-normal active:border-lime-lighter-20/20",
        "tertiary-hacker":
          "border-none bg-transparent text-white hover:text-lime-normal active:text-lime-dark",
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
  childern?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, childern, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
