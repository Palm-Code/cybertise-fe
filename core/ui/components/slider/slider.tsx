"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/core/lib/utils";
import { Badge } from "../badge/badge";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-neutral-900/20 dark:bg-neutral-50/20">
      <SliderPrimitive.Range
        className={cn(
          "absolute h-full bg-gradient-to-r from-semantic-dark-low via-semantic-dark-medium to-semantic-light-high",
          props.value &&
            (props?.value[0] < 4
              ? "from-100%"
              : props?.value[0] >= 4 && props?.value[0] < 7
                ? "from-40% via-100% to-30%"
                : props?.value[0] >= 7
                  ? "from-10% via-70% to-100%"
                  : "from-20% to-0%")
        )}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-8 w-11 cursor-grab overflow-hidden rounded-full shadow-md">
      <Badge
        variant={
          props.value
            ? props?.value[0] === 0
              ? "default"
              : props?.value[0] < 4
                ? "low"
                : props?.value[0] >= 4 && props?.value[0] < 7
                  ? "medium"
                  : "high"
            : "default"
        }
        className="h-full w-full min-w-full border-4 border-white"
      />
    </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
));
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
