import { cn } from "@/core/lib/utils";
import {
  BaseTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./base-tooltip";

interface I_TooltipProps {
  children: React.ReactNode;
  content: string;
  fullwidth?: boolean;
  className?: string;
}

const Tooltip = ({
  className,
  children,
  content,
  fullwidth,
}: I_TooltipProps) => {
  return (
    <TooltipProvider>
      <BaseTooltip>
        <TooltipTrigger
          disabled
          className={cn(fullwidth ? "w-full" : "", className)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  );
};
export default Tooltip;
