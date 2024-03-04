"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card } from "@/core/ui/components";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import Information from "./information/Information";
import { useMultistepForm } from "@/utils/multi-step-form";
import Brief from "./steps/Brief";
import BugTarget from "./steps/BugTarget";
import ReportDescription from "./steps/ReportDescription";
import ProblemCauses from "./steps/ProblemCauses";
import Review from "./steps/Review";
import { informations } from "@/feature/hacker/constants/programs";
import { AnimationWrapper } from "@/core/ui/layout";

interface I_SendReportProps {
  id: string;
}

const SendReport = ({ id }: I_SendReportProps) => {
  const { step, steps, currentStepIndex, isFirstStep, next, back } =
    useMultistepForm([
      {
        element: <Brief />,
        key: "brief",
      },
      {
        element: <BugTarget />,
        key: "bugTarget",
      },
      {
        element: <ReportDescription />,
        key: "reportDescription",
      },
      {
        element: <ProblemCauses />,
        key: "problemCauses",
      },
      {
        element: <Review />,
        key: "review",
      },
    ]);
  return (
    <div className="_flexbox__col__start__start w-full gap-4">
      <Card className="rounded-2xl rounded-b-none px-8 py-6">
        <Link
          href={`/programs/${id}`}
          className={cn(
            typographyVariants({ variant: "h5", weight: "bold" }),
            "inline-flex cursor-pointer items-center gap-5"
          )}
        >
          <MoveLeft />
          Submit Report - VRP Title 1
        </Link>
      </Card>
      <div className="_flexbox__row__start__start w-full gap-8">
        <AnimationWrapper key={steps[currentStepIndex].key} className="w-[80%]">
          <Card className="_flexbox__col__start__start relative gap-6 rounded-xl px-8 py-12">
            <Typography variant="h5" weight="bold">
              {informations[currentStepIndex].label}
            </Typography>
            {informations[currentStepIndex].description && (
              <Typography variant="p" affects="small">
                {informations[currentStepIndex].description}
              </Typography>
            )}
            <Card
              className={cn(
                "_flexbox__col__start__start w-full gap-8",
                "bg-neutral-light-100 p-7 dark:bg-neutral-dark-100"
              )}
            >
              {step}
              <div className="_flexbox__row__center gap-8">
                {!isFirstStep && (
                  <Button variant="secondary-hacker" onClick={back}>
                    Previous
                  </Button>
                )}
                <Button variant="primary-hacker" onClick={next}>
                  Next
                </Button>
              </div>
            </Card>
          </Card>
        </AnimationWrapper>
        <Information lists={informations} activeStep={currentStepIndex + 1} />
      </div>
    </div>
  );
};
export default SendReport;
