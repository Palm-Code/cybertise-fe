import * as React from "react";

import { cn } from "@/core/lib/utils";
import { MoreHorizontalIcon } from "lucide-react";
import { BaseButtonProps } from "../button/base-button";
import Button, { ButtonProps } from "../button/button";

export interface I_PaginationProps {
  variant: "hacker" | "company" | "mediator";
}

const iconColor: { [key in I_PaginationProps["variant"]]: string } = {
  hacker:
    "text-lime-normal-light dark:text-lime-normal-dark hover:text-lime-lighter",
  company: "text-sky-light hover:text-sky-lighter",
  mediator: "text-violet-light hover:text-violet-lighter",
};

const BasePagination = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-end gap-1.5", className)}
    {...props}
  />
);
BasePagination.displayName = "BasePagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li
    ref={ref}
    className={cn("", className)}
    {...props}
  />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
  className?: string;
  children?: React.ReactNode;
} & React.ComponentProps<"button"> &
  Pick<BaseButtonProps, "size"> &
  I_PaginationProps;

const PaginationLink = ({
  className,
  isActive,
  children,
  size = "default",
  variant,
  ...props
}: PaginationLinkProps) => (
  <Button
    variant={isActive ? `primary-${variant}` : `outline-${variant}`}
    className={cn("aspect-square h-9 rounded-lg p-2.5", className)}
    {...props}
  >
    {children}
  </Button>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  variant: variant = "hacker",
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    variant={variant}
    className={cn(
      "gap-1 border-none px-1 hover:!bg-transparent",
      iconColor[variant],
      className
    )}
    {...props}
  >
    Prev
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  variant: variant = "hacker",
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    variant={variant}
    className={cn(
      "gap-1 border-none px-1 hover:!bg-transparent",
      iconColor[variant],
      className
    )}
    {...props}
  >
    Next
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-fit w-fit items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontalIcon className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  BasePagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
