import { useCurrentPhase } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Card, Separator, Typography } from "@/core/ui/components";
import { StepActive, StepInactive, StepPassed } from "@/core/ui/icons";
import { Role } from "@/types/admin/sidebar";

interface I_IndicatorStepsProps {
  variant?: keyof typeof Role;
  currentSteps: number;
}

const currentStatus: {
  [key: string]: {
    icon: string;
    separator: string;
    passedIcon: string;
  };
} = {
  mediator: {
    icon: "text-violet-normal dark:text-violet-normal",
    separator: "h-0.5 bg-violet-normal dark:bg-violet-normal",
    passedIcon: "text-violet-normal dark:text-violet-normal",
  },
  company: {
    icon: "text-sky-normal dark:text-sky-normal",
    separator: "h-0.5 bg-sky-normal dark:bg-sky-normal",
    passedIcon: "text-sky-normal dark:text-sky-normal",
  },
};

const IndicatorSteps = ({
  variant = "mediator",
  currentSteps,
}: I_IndicatorStepsProps) => {
  const steps = useCurrentPhase();
  const STEPS: string[] = [
    steps.phase1,
    steps.phase2,
    steps.phase3,
    steps.phase4,
    steps.phase5,
  ];
  const stepsIcon = (idx: number, style: string, className: string) => {
    if (idx < currentSteps - 1) {
      return <StepPassed className={cn(style, className)} />;
    } else if (idx === currentSteps - 1) {
      return <StepActive className={cn(style, className)} />;
    }
    return <StepInactive className={cn(style, className)} />;
  };

  const separatorColor = (idx: number, direction: "left" | "right") => {
    switch (direction) {
      case "left":
        return idx < currentSteps
          ? currentStatus[variant].separator
          : "bg-separator dark:bg-separator";
      case "right":
        return idx < currentSteps - 1
          ? currentStatus[variant].separator
          : "bg-separator dark:bg-separator";
    }
  };

  return (
    <Card
      className={cn(
        "rounded-none xl:p-0 xl:py-4",
        "_flexbox__col__start__start w-full gap-3"
      )}
    >
      <div className="mx-auto grid w-full grid-cols-5">
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <div
              className="_flexbox__col__start relative w-full gap-1"
              key={`step-${index}`}
            >
              {index < 5 && {
                ...stepsIcon(index, currentStatus[variant].icon, "mx-auto"),
              }}
              {index < 5 && (
                <>
                  <Separator
                    className={cn(
                      "absolute top-2 -z-10 w-1/2",
                      index === 0 ? "hidden" : "block",
                      separatorColor(index, "left")
                    )}
                  />
                  <Separator
                    className={cn(
                      "absolute right-0 top-2 -z-10 w-1/2",
                      index === 4 ? "hidden" : "block",
                      separatorColor(index, "right")
                    )}
                  />
                </>
              )}
              <div className="_flexbox__row__center relative w-full">
                {index < 5 && (
                  <div className="_flexbox__col__center relative">
                    <Typography variant="p" affects="small" weight="semibold">
                      Step {index + 1}
                    </Typography>
                    <Typography variant="p" affects="small">
                      {STEPS[index]}
                    </Typography>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </Card>
  );
};
export default IndicatorSteps;
