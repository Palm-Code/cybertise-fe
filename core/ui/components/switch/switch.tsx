"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/core/lib/utils";
import Moon from "../../icons/moon/Moon.icon";
import Sun from "../../icons/sun/Sun.icon";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      "peer inline-flex h-8 w-19 shrink-0 cursor-pointer items-center justify-between rounded-full border-2 border-transparent px-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=unchecked]:bg-neutral-200 dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=unchecked]:bg-neutral-800",
      className
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none rounded-full bg-transparent shadow-lg ring-0 transition-all duration-300 data-[state=checked]:block data-[state=unchecked]:hidden data-[state=checked]:translate-x-10 data-[state=unchecked]:translate-x-0 data-[state=checked]:rotate-90 data-[state=unchecked]:rotate-0 dark:bg-transparent"
      )}
    >
      <Moon />
    </SwitchPrimitives.Thumb>
    <SwitchPrimitives.Thumb
      className={cn(
        "pointer-events-none rounded-full bg-transparent shadow-lg ring-0 transition-all duration-300 data-[state=unchecked]:block data-[state=checked]:hidden data-[state=checked]:-translate-x-10 data-[state=unchecked]:translate-x-0 data-[state=checked]:rotate-90 data-[state=unchecked]:rotate-0 dark:bg-transparent"
      )}
    >
      <Sun />
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
