"use client";
import { cn } from "@/core/lib/utils";
import { Card } from "@/core/ui/components";
import { useMultistepForm } from "@/utils/multi-step-form";
import { AnimationWrapper } from "@/core/ui/layout";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import Information from "../_content/informations/Informations";
import {
  monetaryAwardData,
  vrpInformations,
} from "@/core/constants/vrp-launchpad";
import VrpDetailsReview from "../_content/steps/vrp-details-review/VrpDetailsReview";
import Notes from "../_content/steps/notes/Notes";
import Brief from "../_content/steps/brief/Brief";
import VrpDescriptionCard from "../_content/steps/make-changes/_card/VrpDescriptionCard";
import MonetaryAwardCardList from "../_content/steps/make-changes/_card/MonetaryAwardsCard";
import TargetAssetListCard from "../_content/steps/make-changes/_card/TargetAssetListCard";
import ModalPublishVRP from "../../_dialog/ModalPublishVRP";

interface I_VRPDetailsProps {
  id: string;
  variant: "mediator" | "company";
  currentStep?: number;
}

const VRPDetails = ({ id, variant, currentStep = 1 }: I_VRPDetailsProps) => {
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
      element: <Brief onClickNext={() => next()} />,
      key: "brief",
    },
    {
      element: (
        <VrpDescriptionCard
          isCompany
          onClickNext={() => next()}
          onClickPrev={() => back()}
        />
      ),
      key: "vrp-details",
    },
    {
      element: (
        <MonetaryAwardCardList
          data={monetaryAwardData}
          isCompany
          onClickNext={() => next()}
          onClickPrev={() => back()}
        />
      ),
      key: "monetary-award",
    },
    {
      element: (
        <TargetAssetListCard
          isCompany
          onClickNext={() => next()}
          onClickPrev={() => back()}
        />
      ),
      key: "target-asset",
    },
    {
      element: (
        <Notes
          variant="company"
          onClickNext={() => next()}
          onClickPrev={() => back()}
        />
      ),
      key: "notes",
    },
    {
      element: (
        <VrpDetailsReview
          variant="company"
          isLastStep
          onClickEdit={() => goTo(1)}
          onClickNext={() => setOpenModal(true)}
        />
      ),
      key: "review",
    },
  ]);

  const onSubmitForm = () => {
    setSuccessSubmit(true);
  };

  return (
    <>
      <FormProvider {...method}>
        <div ref={containerRef} className="absolute top-0"></div>
        <form
          onSubmit={method.handleSubmit(onSubmitForm)}
          className="_flexbox__col__start__start min-h-full w-full gap-0 rounded-2xl"
        >
          <AnimationWrapper
            key={steps[currentStepIndex].key}
            className={cn(
              "sticky z-30 h-fit space-y-0 bg-background-page-light dark:bg-background-page-dark",
              variant === "mediator" ? "top-[17.5rem]" : "top-[15.8rem]"
            )}
          >
            <div className="w-[calc(80%-1.6rem) h-6 bg-background-page-light dark:bg-background-page-dark"></div>
            <div
              className={cn(
                "h-4 w-[calc(80%-1.6rem)] rounded-t-xl",
                "bg-background-main-light pt-0 dark:bg-background-main-dark"
              )}
            ></div>
          </AnimationWrapper>
          <div className="_flexbox__row__start__start relative h-full w-full gap-8">
            <div className="h-full w-[80%] overflow-y-auto">
              <AnimationWrapper key={steps[currentStepIndex].key}>
                <Card
                  className={cn(
                    "_flexbox__col__start__start h-full gap-6",
                    "overflow-y-auto rounded-b-xl rounded-t-none px-8 pb-12 pt-8"
                  )}
                >
                  {step}
                </Card>
              </AnimationWrapper>
            </div>
            <div
              className={cn(
                "sticky z-40 -mt-4 w-[20%] rounded-xl",
                "bg-background-main-light dark:bg-background-main-dark",
                variant === "mediator" ? "top-[19rem]" : "top-[17.5rem]"
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
      <ModalPublishVRP isOpen={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
};
export default VRPDetails;
