import { cn } from "@/core/lib/utils";
import {
  BaseTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./base-tooltip";

interface I_TooltipProps {
  children: React.ReactNode;
  content?: string;
  fullwidth?: boolean;
  className?: string;
  comps?: React.ReactNode;
  contentClassName?: string;
}

const Tooltip = ({
  className,
  contentClassName,
  children,
  content = "",
  fullwidth,
  comps,
  ...props
}: I_TooltipProps) => {
  return (
    <TooltipProvider>
      <BaseTooltip delayDuration={0}>
        <TooltipTrigger
          disabled
          className={cn(fullwidth ? "w-full" : "", className)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className={cn("max-w-xs", contentClassName)}>
          {comps}
          <p>{content}</p>
        </TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  );
};
export default Tooltip;
