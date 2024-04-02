import { Dot } from "lucide-react";
import Typography from "../../components/typography/typography";
import { cn } from "@/core/lib/utils";
import { Desktop, Mobile } from "..";

interface I_StepWrapperProps {
  children: React.ReactNode;
  currentSteps: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  className?: string;
}

const StepWrapper = ({
  children,
  currentSteps,
  totalSteps,
  title,
  subtitle,
  className,
}: I_StepWrapperProps) => {
  return (
    <>
      <Mobile>
        <div
          className={cn(
            "_flexbox__col__start mb-4 w-full gap-2 transition-all duration-100",
            className
          )}
        >
          <Typography variant="p" affects="small" className="inline-flex">
            {currentSteps} of {totalSteps} <Dot width={24} height={24} />{" "}
            {title}
          </Typography>
          <Typography variant="h4" weight="bold">
            {subtitle}
          </Typography>
        </div>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "_flexbox__col__start mb-4 w-full gap-2 transition-all duration-100",
            className
          )}
        >
          <Typography variant="p" affects="normal" className="inline-flex">
            {currentSteps} of {totalSteps} <Dot width={24} height={24} />{" "}
            {title}
          </Typography>
          <Typography variant="h4" weight="bold">
            {subtitle}
          </Typography>
        </div>
      </Desktop>
      {children}
    </>
  );
};
export default StepWrapper;
