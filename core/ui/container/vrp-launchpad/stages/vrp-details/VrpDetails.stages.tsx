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
import {
  createVrpSchema,
  CreateVrpType,
} from "@/core/models/common/post_create_vrp";
import { zodResolver } from "@hookform/resolvers/zod";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { useGetAssetType } from "@/core/react-query/client";
import { SortFilterType } from "@/types/admin/dashboard";
import { toast } from "sonner";
import ModalSubmitVRP from "../../_dialog/ModalSubmitVRP";
import RulesAndPolicies from "../_content/steps/vrp-details-review/_card/RulesAndPolicies";
import { usePostUpdateVrp } from "@/core/react-query/client/usePostUpdateVrp";
import { Role } from "@/types/admin/sidebar";
import {
  getCurrentDate,
  getCurrentTime,
} from "@/utils/formatter/date-formatter";

interface I_VRPDetailsProps {
  variant: keyof typeof Role;
  currentStep?: string;
  initialValues?: I_GetProgramDetailsSuccessResponse["data"];
}

const VRPDetails = ({
  variant,
  initialValues,
  currentStep = "Phase1",
}: I_VRPDetailsProps) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
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
  const lists: {
    [key: string]: {
      label: string;
      value: number;
    }[];
  } = {
    Phase1: vrpInformations.vrp_details,
    Phase2: vrpInformations.setup_phase,
    Phase3: vrpInformations.company_revision,
    Phase4: vrpInformations.mediator_revision,
    Phase5: vrpInformations.publish,
    Published: vrpInformations.publish,
  };
  const { mutateAsync, isPending, isSuccess } = usePostUpdateVrp(
    initialValues?.id!
  );
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
    useMultistepForm(
      [
        {
          element:
            currentStep === "Phase1" ? (
              <Brief onClickNext={() => next()} />
            ) : currentStep === "Phase5" || currentStep === "Published" ? (
              <VrpDetailsReview
                currentStep={currentStep}
                assetTypes={options}
                variant={variant}
                onClickRevise={() => onSubmitForm("Phase4")}
                onClickNext={() => {
                  method.setValue("publish_date", getCurrentDate());
                  method.setValue("publish_time", getCurrentTime());
                  setOpenModal(true);
                }}
                onClickEdit={() => next()}
              />
            ) : (
              <Notes
                currentSteps={currentStep}
                variant={variant}
                onClickNext={() => next()}
              />
            ),
          key:
            currentStep === "Phase1"
              ? "brief"
              : currentStep === "Phase5" || currentStep === "Published"
                ? "details"
                : "notes",
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
              variant={variant}
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
              options={options}
              onClickNext={() => next()}
              onClickPrev={() => back()}
            />
          ),
          key: "target-asset",
        },
        currentStep !== "Phase1" && {
          element: (
            <RulesAndPolicies
              variant={variant}
              isReview={variant !== "mediator"}
              onClickPrev={() => back()}
              onClickNext={() => next()}
            />
          ),
          key: "rules-and-policies",
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
              currentStep={currentStep}
              variant="company"
              assetTypes={options}
              isLoading={isPending}
              isLastStep
              onClickEdit={() => goTo(1)}
              onClickNext={() => onSubmitForm()}
              onClickRevise={() => onSubmitForm("Phase4")}
            />
          ),
          key: "review",
        },
      ].filter(Boolean) as { element: JSX.Element; key: string }[]
    );

  const onSubmitForm = (status?: string) => {
    if (Object.values(method.formState.errors).length === 0) {
      const data = method.getValues();
      status && (data["status"] = status);
      mutateAsync(data).then(() => {
        setOpenModal(false);
      });
    } else {
      toast.error("Please fill in all required fields");
    }
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
                    "overflow-y-auto rounded-b-xl rounded-t-none px-8 xl:pb-12 xl:pt-8"
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
                lists={lists[currentStep]}
                variant={variant}
                activeStep={currentStepIndex + 1}
              />
            </div>
          </div>
        </div>
        <ModalPublishVRP
          isOpen={openModal}
          isLoading={isPending || isSuccess}
          onClickPublish={() => {
            onSubmitForm();
          }}
          onClose={() => {
            method.setValue("publish_date", undefined);
            method.setValue("publish_time", undefined);
            setOpenModal(false);
          }}
        />
      </FormProvider>
      <ModalSubmitVRP
        isOpen={isSuccess}
        titleText="The program has been updated."
      />
    </>
  );
};
export default VRPDetails;
