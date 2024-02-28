import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors text-center capitalize",
  {
    variants: {
      variant: {
        ios: "text-asset-text-ios bg-asset-background-ios/10 px-2.5 py-1",
        iot: "text-asset-text-iot bg-asset-background-iot/10 px-2.5 py-1",
        android:
          "text-asset-text-android bg-asset-background-android/10 px-2.5 py-1",
        default:
          "bg-neutral-light-70 dark:bg-neutral-dark-70 text-neutral-light-0 dark:text-white px-2.5 py-1",
        hacker:
          "text-lime-badge bg-neutral-light-90 dark:bg-neutral-dark-90 px-2.5 py-0",
        company:
          "text-sky-normal bg-neutral-light-90 dark:bg-neutral-dark-90 px-2.5 py-0",
        mediator:
          "text-violet-normal bg-neutral-light-90 dark:bg-neutral-dark-90 px-2.5 py-0 ",
        critical:
          "text-neutral-light-80 dark:text-white bg-semantic-light-critical dark:bg-semantic-dark-critical px-2.5 py-1",
        high: "text-neutral-light-80 dark:text-white bg-semantic-light-high dark:bg-semantic-dark-high px-2.5 py-1",
        medium:
          "text-white bg-semantic-light-medium dark:bg-semantic-dark-medium px-2.5 py-1",
        low: "text-neutral-light-0 dark:text-neutral-dark-80 bg-semantic-light-low dark:bg-semantic-dark-low px-2.5 py-1",
        info: "text-white bg-semantic-light-info dark:bg-semantic-dark-info px-2.5 py-1",
        url: "bg-asset-background-domain/10 text-asset-background-domain px-2.5 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
