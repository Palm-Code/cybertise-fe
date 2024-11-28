import { cn } from "@/core/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & React.HTMLAttributes<HTMLDivElement>;

export const Wrapper = ({ children, className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "w-full rounded-xl bg-statistic-card-light backdrop-blur-[5px] dark:bg-statistic-card-dark",
        "border border-neutral-light-80 px-6 py-5 dark:border-neutral-dark-80",
        "flex flex-col gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
