import { cn } from "@/core/lib/utils";
import { Card, Separator, Typography } from "@/core/ui/components";
import { StepActive, StepInactive, StepPassed } from "@/core/ui/icons";

const IndicatorSteps = () => {
  return (
    <Card
      className={cn(
        "rounded-none p-0 py-6",
        "_flexbox__col__start__start w-full gap-3"
      )}
    >
      <div className="mx-auto grid w-10/12 grid-cols-4">
        <div className="_flexbox__col__start relative w-full gap-3">
          <StepPassed className="absolute -top-1.5 left-0 -translate-x-1/2 text-violet-normal dark:text-violet-normal" />
          <Separator className="h-0.5 bg-violet-normal dark:bg-violet-normal" />
          <div className="_flexbox__col__center relative -ml-9 w-fit">
            <Typography variant="p" affects="small" weight="semibold">
              Step 1
            </Typography>
            <Typography variant="p" affects="small">
              VRP Details
            </Typography>
          </div>
        </div>
        <div className="_flexbox__col__start relative w-full gap-3">
          <StepPassed className="absolute -top-1.5 left-0 -translate-x-1/2 text-violet-normal dark:text-violet-normal" />
          <Separator className="h-0.5 bg-violet-normal dark:bg-violet-normal" />
          <div className="_flexbox__col__center relative -ml-9 w-fit">
            <Typography variant="p" affects="small" weight="semibold">
              Step 1
            </Typography>
            <Typography variant="p" affects="small">
              VRP Details
            </Typography>
          </div>
        </div>
        <div className="_flexbox__col__start relative w-full gap-3">
          <StepPassed className="absolute -top-1.5 left-0 -translate-x-1/2 text-violet-normal dark:text-violet-normal" />
          <Separator className="h-0.5 bg-violet-normal dark:bg-violet-normal" />
          <div className="_flexbox__col__center relative -ml-9 w-fit">
            <Typography variant="p" affects="small" weight="semibold">
              Step 1
            </Typography>
            <Typography variant="p" affects="small">
              VRP Details
            </Typography>
          </div>
        </div>
        <div className="_flexbox__col__start relative w-full gap-3">
          <StepPassed className="absolute -top-1.5 left-0 -translate-x-1/2 text-violet-normal dark:text-violet-normal" />
          <Separator className="h-0.5 bg-violet-normal dark:bg-violet-normal" />
          <div className="_flexbox__row__center__between w-full">
            <div className="_flexbox__col__center relative -ml-9 w-fit">
              <Typography variant="p" affects="small" weight="semibold">
                Step 1
              </Typography>
              <Typography variant="p" affects="small">
                VRP Details
              </Typography>
            </div>
            <div className="_flexbox__col__center relative -mr-9 w-fit">
              <Typography variant="p" affects="small" weight="semibold">
                Step 1
              </Typography>
              <Typography variant="p" affects="small">
                VRP Details
              </Typography>
            </div>
          </div>
          <StepPassed className="absolute -top-1.5 right-0 translate-x-1/2 text-violet-normal dark:text-violet-normal" />
        </div>
      </div>
    </Card>
  );
};
export default IndicatorSteps;
