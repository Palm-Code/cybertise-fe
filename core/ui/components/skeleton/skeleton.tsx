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

export const SkeletonList = ({
  className,
  count = 10,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  count?: number;
}) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <Skeleton key={`skeleton-${index}`} className={className} />
    ));
};

export { Skeleton };
