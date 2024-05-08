"use client";
import { cn } from "@/core/lib/utils";
import { Card } from "@/core/ui/components";
import { useMultistepForm } from "@/utils/multi-step-form";
import { AnimationWrapper } from "@/core/ui/layout";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import Information from "../_content/informations/Informations";
import { vrpInformations } from "@/core/constants/vrp-launchpad";
import VrpDetailsReview from "../_content/steps/vrp-details-review/VrpDetailsReview";
import MakeChanges from "../_content/steps/make-changes/MakeChanges";
import Notes from "../_content/steps/notes/Notes";
import { useGetAssetType } from "@/core/react-query/client";
import { SortFilterType } from "@/types/admin/dashboard";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import {
  createVrpSchema,
  CreateVrpType,
} from "@/core/models/common/post_create_vrp";
import { zodResolver } from "@hookform/resolvers/zod";

interface I_SetupProps {
  variant: "mediator" | "company";
  currentStep?: string;
  initialData?: I_GetProgramDetailsSuccessResponse["data"];
}

const Setup = ({
  variant,
  currentStep,
  initialData: initialValues,
}: I_SetupProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [successSubmit, setSuccessSubmit] = useState<boolean>(false);
  const { data: assetTypeOptions } = useGetAssetType();
  const options: SortFilterType[] =
    assetTypeOptions
      ?.map((item) => {
        return {
          value: item.value.toLowerCase(),
          label: item.label,
          id: item.id,
        };
      })
      .filter((item) => item.id !== "") || [];
  const method = useForm<CreateVrpType>({
    mode: "onChange",
    resolver: zodResolver(createVrpSchema),
    defaultValues: {
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      monetary_awards_critical: initialValues?.monetary_awards_critical || 0,
      monetary_awards_high: initialValues?.monetary_awards_high || 0,
      monetary_awards_medium: initialValues?.monetary_awards_medium || 0,
      monetary_awards_low: initialValues?.monetary_awards_low || 0,
      target_assets: initialValues?.target_assets || [],
      notes: initialValues?.notes || "",
      monetary_awards_level: initialValues?.monetary_awards_level || "",
      type: initialValues?.type || "",
      rules: initialValues?.rules || "",
      policies: initialValues?.policies || "",
      asset_types_values: initialValues?.asset_types || [],
    },
  });
  const { step, steps, currentStepIndex, goTo, next, back, containerRef } =
    useMultistepForm([
      {
        element: (
          <VrpDetailsReview
            currentStep={currentStep}
            variant={variant}
            assetTypes={options}
            onClickNext={() => next()}
          />
        ),
        key: "vrp-details",
      },
      {
        element: (
          <MakeChanges
            options={options}
            onClickNext={() => next()}
            onClickPrev={() => back()}
          />
        ),
        key: "make-changes",
      },
      {
        element: (
          <Notes onClickNext={() => next()} onClickPrev={() => back()} />
        ),
        key: "notes",
      },
      {
        element: (
          <VrpDetailsReview
            currentStep={currentStep}
            assetTypes={options}
            isLastStep
            onClickEdit={() => goTo(1)}
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
        <div className="_flexbox__col__start__start min-h-full w-full gap-0 rounded-2xl">
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
                lists={vrpInformations.setup_phase}
                variant={variant}
                activeStep={currentStepIndex + 1}
              />
            </div>
          </div>
        </div>
      </FormProvider>
    </>
  );
};
export default Setup;
