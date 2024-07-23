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
}

const Tooltip = ({ children, content, fullwidth }: I_TooltipProps) => {
  return (
    <TooltipProvider>
      <BaseTooltip>
        <TooltipTrigger disabled className={fullwidth ? "w-full" : ""}>
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
