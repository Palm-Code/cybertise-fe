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
  const isMobileDevice = useMediaQuery("(max-width: 1279px)");
  if (!isMobileDevice) return null;
  return (
    <div className={cn("block h-fit w-full xl:hidden", className)}>
      {children}
    </div>
  );
};
export default MobileLayout;
