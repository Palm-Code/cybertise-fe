"use client";
import { cn } from "@/core/lib/utils";
import { useMediaQuery } from "usehooks-ts";

const DesktopLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const isMobileDevice = useMediaQuery("(max-width: 1279px)");
  if (isMobileDevice) return null;
  return (
    <div className={cn("hidden h-fit w-full xl:block", className)}>
      {children}
    </div>
  );
};
export default DesktopLayout;
