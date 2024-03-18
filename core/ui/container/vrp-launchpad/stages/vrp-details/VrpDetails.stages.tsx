"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card } from "@/core/ui/components";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import { FilePenLine, X } from "lucide-react";
import { useMultistepForm } from "@/utils/multi-step-form";
import { informations } from "@/feature/hacker/constants/programs";
import { AnimationWrapper } from "@/core/ui/layout";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import Information from "./informations/Informations";
import { vrpInformations } from "@/core/constants/vrp-launchpad";

interface I_VrpDetailsProps {
  id: string;
  variant: "mediator" | "company";
}

const VrpDetails = ({ id, variant }: I_VrpDetailsProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [successSubmit, setSuccessSubmit] = useState<boolean>(false);
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
    containerRef,
  } = useMultistepForm([
    {
      element: <></>,
      key: "brief",
    },
    {
      element: <></>,
      key: "bugTarget",
    },
    {
      element: <></>,
      key: "reportDescription",
    },
    {
      element: <></>,
      key: "problemCauses",
    },
    {
      element: <></>,
      key: "review",
    },
  ]);

  const onSubmitForm = () => {
    setSuccessSubmit(true);
  };

  return (
    <FormProvider {...method}>
      <div ref={containerRef}></div>
      <form
        onSubmit={method.handleSubmit(onSubmitForm)}
        className="_flexbox__col__start__start min-h-full w-full gap-0 rounded-2xl"
      >
        <AnimationWrapper key={id}>
          <div
            className={cn(
              "sticky top-[8.15rem] z-30 h-4 w-[calc(80%-1.6rem)] rounded-t-xl",
              isLastStep
                ? "bg-neutral-light-100 dark:bg-neutral-dark-100"
                : "bg-background-main-light pt-0 dark:bg-background-main-dark"
            )}
          ></div>
        </AnimationWrapper>
        <div className="_flexbox__row__start__start relative h-full w-full gap-8">
          <div className="h-full w-[80%] overflow-y-auto">
            <AnimationWrapper key={steps[currentStepIndex].key}>
              <Card
                className={cn(
                  "_flexbox__col__start__start h-full gap-6",
                  "overflow-y-auto rounded-b-xl rounded-t-none px-8 pb-12 pt-8",
                  isLastStep && "bg-neutral-light-100 dark:bg-neutral-dark-100"
                )}
              >
                <div className="_flexbox__row__center__between w-full">
                  <Typography variant="h5" weight="bold">
                    {vrpInformations.vrp_details[currentStepIndex].label}
                  </Typography>
                  {isLastStep && (
                    <Button
                      variant="tertiary-mediator"
                      prefixIcon={<FilePenLine />}
                      onClick={() => goTo(0)}
                    >
                      Edit Report
                    </Button>
                  )}
                </div>
                <Card
                  className={cn(
                    "_flexbox__col__start__start w-full gap-8",
                    "bg-neutral-light-100 dark:bg-neutral-dark-100",
                    isLastStep ? "p-0" : "p-7"
                  )}
                >
                  {step}
                </Card>
              </Card>
            </AnimationWrapper>
          </div>
          <div
            className={cn(
              "sticky top-[2rem] z-40 -mt-4 w-[20%] rounded-xl",
              isLastStep
                ? "bg-neutral-light-100 dark:bg-neutral-dark-100"
                : "bg-background-main-light dark:bg-background-main-dark"
            )}
          >
            <Information
              lists={vrpInformations.vrp_details}
              variant={variant}
              activeStep={currentStepIndex + 1}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
export default VrpDetails;
