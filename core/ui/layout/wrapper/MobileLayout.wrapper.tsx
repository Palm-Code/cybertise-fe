"use client";
import { cn } from "@/core/lib/utils";
import { useMediaQuery } from "usehooks-ts";

const MobileLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const matches = useMediaQuery("(min-width: 1280px)");

  if (matches) {
    return null;
  }

  return (
    <div className={cn("block h-fit w-full xl:hidden", className)}>
      {children}
    </div>
  );
};
export default MobileLayout;
