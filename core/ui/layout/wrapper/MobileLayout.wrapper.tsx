"use client";
import { cn } from "@/core/lib/utils";

const MobileLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("block h-fit w-full xl:hidden", className)}>
      {children}
    </div>
  );
};
export default MobileLayout;
