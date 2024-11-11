"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/core/lib/utils";

export interface BaseCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {}

const BaseCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  BaseCheckboxProps
>(({ className, children, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-5 shrink-0 rounded disabled:cursor-not-allowed disabled:border-none",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      {children}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
BaseCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { BaseCheckbox };
