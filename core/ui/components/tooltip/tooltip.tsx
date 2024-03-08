import {
  BaseTooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./base-tooltip";

interface I_TooltipProps {
  children: React.ReactNode;
  content: string;
}

const Tooltip = ({ children, content }: I_TooltipProps) => {
  return (
    <TooltipProvider>
      <BaseTooltip>
        <TooltipTrigger disabled>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{content}</p>
        </TooltipContent>
      </BaseTooltip>
    </TooltipProvider>
  );
};
export default Tooltip;
