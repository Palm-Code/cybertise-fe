import { Dot } from "lucide-react";
import Typography from "../../components/typography";

interface I_StepWrapperProps {
  children: React.ReactNode;
  currentSteps: number;
  totalSteps: number;
  title: string;
  subtitle: string;
}

const StepWrapper = ({
  children,
  currentSteps,
  totalSteps,
  title,
  subtitle,
}: I_StepWrapperProps) => {
  return (
    <>
      <div className="_flexbox__col__start mb-4 w-full gap-2">
        <Typography variant="p" affects="normal" className="inline-flex">
          {currentSteps} of {totalSteps} <Dot width={24} height={24} /> {title}
        </Typography>
        <Typography variant="h4" weight="bold">
          {subtitle}
        </Typography>
      </div>
      {children}
    </>
  );
};
export default StepWrapper;
