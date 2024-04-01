import { cn } from "@/core/lib/utils";

const DesktopLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("hidden h-fit w-full xl:block", className)}>
      {children}
    </div>
  );
};
export default DesktopLayout;
