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
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  if (!isDesktop) return null;
  return (
    <div
      className={cn(
        "invisible hidden h-fit w-full xl:visible xl:block",
        className
      )}
    >
      {children}
    </div>
  );
};
export default DesktopLayout;
