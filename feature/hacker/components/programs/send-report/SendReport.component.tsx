"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card } from "@/core/ui/components";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import { FilePenLine, X } from "lucide-react";
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
import { FormProvider, useForm } from "react-hook-form";

interface I_SendReportProps {
  id: string;
}

const SendReport = ({ id }: I_SendReportProps) => {
  const method = useForm();
  const {
    step,
    steps,
    currentStepIndex,
    isFirstStep,
    isLastStep,
    goTo,
    next,
    back,
  } = useMultistepForm([
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
    <FormProvider {...method}>
      <div className="_flexbox__col__start__start min-h-full w-full gap-3 rounded-2xl">
        <div className="sticky top-0 z-30 h-fit w-full bg-background-page-light pt-12 dark:bg-background-page-dark">
          <Card className="rounded-2xl rounded-b-none px-8 py-6">
            <Link
              href={`/programs/${id}`}
              className={cn(
                typographyVariants({ variant: "h5", weight: "bold" }),
                "inline-flex cursor-pointer items-center gap-5"
              )}
            >
              <X />
              Submit Report - VRP Title 1
            </Link>
          </Card>
        </div>
        <div className="_flexbox__row__start__start relative h-full w-full gap-8">
          <AnimationWrapper
            key={steps[currentStepIndex].key}
            className="mt-1 h-full w-[80%] overflow-y-auto"
          >
            <Card className="_flexbox__col__start__start h-full gap-6 overflow-y-auto rounded-xl px-8 py-12">
              <div className="_flexbox__row__center__between w-full">
                <Typography variant="h5" weight="bold">
                  {informations[currentStepIndex].label}
                </Typography>
                {isLastStep && (
                  <Button
                    variant="tertiary-hacker"
                    prefixIcon={<FilePenLine />}
                    onClick={() => goTo(0)}
                  >
                    Edit Report
                  </Button>
                )}
              </div>
              {informations[currentStepIndex].description && (
                <Typography variant="p" affects="small">
                  {informations[currentStepIndex].description}
                </Typography>
              )}
              <Card
                className={cn(
                  "_flexbox__col__start__start w-full gap-8",
                  isLastStep
                    ? "bg-transparent p-0"
                    : "bg-neutral-light-100 p-7 dark:bg-neutral-dark-100"
                )}
              >
                {step}
                <div className="_flexbox__row__center gap-8">
                  {!isFirstStep && !isLastStep ? (
                    <Button variant="secondary-hacker" onClick={back}>
                      Previous
                    </Button>
                  ) : null}
                  {isLastStep ? (
                    <Button type="submit" variant="primary-hacker" disabled>
                      Send Report
                    </Button>
                  ) : (
                    <Button variant="primary-hacker" onClick={next}>
                      Next
                    </Button>
                  )}
                </div>
              </Card>
            </Card>
          </AnimationWrapper>
          <div className="sticky top-[9.2rem] w-[20%]">
            <Information
              lists={informations}
              activeStep={currentStepIndex + 1}
            />
          </div>
        </div>
      </div>
    </FormProvider>
  );
};
export default SendReport;
