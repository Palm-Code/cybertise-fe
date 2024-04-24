import { cn } from "@/core/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "h-6 w-full animate-pulse rounded-md bg-neutral-light-80 dark:bg-neutral-dark-80",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
