import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/core/lib/utils";

const badgeVariants = cva(
  "inline-flex min-w-19 items-center justify-center rounded-full text-sm font-medium transition-colors text-center capitalize",
  {
    variants: {
      variant: {
        default:
          "bg-neutral-light-80 dark:bg-neutral-dark-80 text-neutral-light-0 dark:text-white px-2.5 py-1",
        "no risk":
          "bg-neutral-light-80 dark:bg-neutral-dark-80 text-neutral-light-0 dark:text-white px-2.5 py-1",
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
        infrastructure:
          "!bg-asset-infrastructure/10 px-2.5 py-1 !text-asset-infrastructure",
        webapplication:
          "!bg-asset-webapplication/10 px-2.5 py-1 !text-asset-webapplication",
        "software-pc":
          "bg-asset-software-pc/10 px-2.5 py-1 !text-asset-software-pc",
        mobileapp: "!bg-asset-mobileapp/10 px-2.5 py-1 !text-asset-mobileapp",
        api: "!bg-asset-api/10 px-2.5 py-1 !text-asset-api",
        ai: "!bg-asset-ai/10 px-2.5 py-1 !text-asset-ai",
        blockchain:
          "!bg-asset-blockchain/10 px-2.5 py-1 !text-asset-blockchain",
        cryptography:
          "!bg-asset-cryptography/10 px-2.5 py-1 !text-asset-cryptography",
        gaming: "!bg-asset-gaming/10 px-2.5 py-1 !text-asset-gaming",
        onlinecasino:
          "!bg-asset-onlinecasino/10 px-2.5 py-1 !text-asset-onlinecasino",
        "code-audit":
          "!bg-asset-codeaudit/10 px-2.5 py-1 !text-asset-codeaudit",
        other:
          "bg-neutral-light-80 dark:bg-neutral-dark-80 text-neutral-light-0 dark:text-white px-2.5 py-1",
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
