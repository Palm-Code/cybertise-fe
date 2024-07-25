"use client";

import * as React from "react";
import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors hover:bg-neutral-light-80 data-[state=on]:bg-neutral-light-80 dark:hover:bg-neutral-dark-80 dark:data-[state=on]:bg-neutral-dark-80",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-neutral-200 bg-transparent shadow-sm",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-6 w-6 p-0.5",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
