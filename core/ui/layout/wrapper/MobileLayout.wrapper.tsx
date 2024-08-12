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
  const isMobile = useMediaQuery("(max-width: 1279px)");

  if (!isMobile) return null;
  return (
    <div className={cn("block h-fit w-full xl:hidden", className)}>
      {children}
    </div>
  );
};
export default MobileLayout;
