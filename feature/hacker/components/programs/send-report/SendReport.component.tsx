"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card, Checkbox, Tooltip } from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import { FilePenLine, X } from "lucide-react";
import Information from "./information/Information";
import { useMultistepForm } from "@/utils/multi-step-form";
import Brief from "./steps/Brief";
import BugTarget from "./steps/BugTarget";
import ReportDescription from "./steps/ReportDescription";
import ProblemCauses from "./steps/ProblemCauses";
import Review from "./steps/Review";
import { informations } from "@/feature/hacker/constants/programs";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { FormProvider, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import ModalCloseSendReport from "../_dialog/ModalCloseSendReport";
import ModalSuccessSubmit from "../_dialog/ModalSuccessSubmit";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  sendReportFormSchema,
  SendReportRequestType,
} from "@/core/models/common/post_send_report";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { useGetProgramDetails } from "@/feature/hacker/query/client/useGetProgramDetails";
import { useGetVulnerabilityType } from "@/core/react-query/client/useGetVulnerabilityType";
import { usePostSendReports } from "@/feature/hacker/query/client/usePostSendReport";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { Skeleton } from "@/core/ui/components/skeleton/skeleton";
import {
  AttackComplexity,
  AttackVector,
  Availability,
  Confidentiality,
  Integrity,
  PrivilegesRequired,
  Scope,
  UserInteraction,
} from "@/enums";
import Link from "next/link";

interface I_SendReportProps {
  id: string;
  defaultData?: {
    assetType?: I_GetAssetTypeSuccessResponse["data"];
  };
}

const SendReport = ({ id, defaultData }: I_SendReportProps) => {
  const { data } = useGetProgramDetails(
    {
      params: {
        include: "targetAssets",
      },
    },
    id
  );

  const [isAgreed, setIsAgreed] = useState<boolean>(false);
  const { mutateAsync, isPending, isSuccess } = usePostSendReports();
  const { data: vulnerabilityType } = useGetVulnerabilityType();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const method = useForm<SendReportRequestType>({
    mode: "all",
    resolver: zodResolver(sendReportFormSchema),
    defaultValues: {
      ticket_type: "Hacker",
      program_id: id,
      risk_level: 0,
      custom_ta_asset_type_id: undefined,
      custom_ta_value: undefined,
      title: "",
      description: "",
      impact: "",
      poc: "",
      vulnerabiity_type_id: "",
      target_asset_id: "",
    },
  });
  const forms = method.watch();
  const disabledButton = useMemo(() => {
    const disabled: { [key: string]: boolean } = {
      0: false,
      1:
        !forms.vulnerabiity_type_id ||
        (!forms.custom_ta_asset_type_id &&
          !forms.target_asset_id &&
          !forms.custom_ta_value),
      2: !forms.title || !forms.description,
      3: !forms.impact || !forms.poc,
      4: !isAgreed,
    };

    return disabled;
  }, [forms]);

  const stepsComponents = useMemo(
    () => [
      {
        element: <Brief />,
        key: "brief",
      },
      {
        element: (
          <BugTarget
            defaultData={{
              assetType: defaultData?.assetType,
              targetAssets: data?.data.target_assets,
              vulnerabilityType: vulnerabilityType,
            }}
          />
        ),
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
        element: (
          <Review
            defaultData={{
              assetType: defaultData?.assetType,
              targetAssets: data?.data.target_assets,
              vulnerabilityType: vulnerabilityType,
            }}
            data={forms}
          />
        ),
        key: "review",
      },
    ],
    [data, vulnerabilityType, defaultData, forms]
  );

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
  } = useMultistepForm(stepsComponents);

  const onSubmitForm = () => {
    mutateAsync(forms);
  };

  return (
    <>
      <Mobile>
        <EmptyState variant="hacker" />
      </Mobile>
      <Desktop>
        <FormProvider {...method}>
          <div ref={containerRef}></div>
          <div className="_flexbox__col__start__start min-h-full w-full gap-0 rounded-2xl">
            <div
              className={cn(
                "_flexbox__col__start__start sticky top-0 z-30",
                "h-fit w-full gap-3 bg-background-page-light pt-12 dark:bg-background-page-dark"
              )}
            >
              <Card className="rounded-2xl rounded-b-none xl:px-8 xl:py-6">
                <div
                  className={cn("grid grid-cols-[auto_1fr] items-center gap-5")}
                >
                  <X
                    onClick={() => setOpenModal(true)}
                    className="cursor-pointer"
                  />
                  {!data?.data ? (
                    <Skeleton className="w-48" />
                  ) : (
                    <Typography variant="h5" weight="bold">
                      Submit Report -{" "}
                      <Tooltip content={data?.data.title as string}>
                        {data?.data && data?.data.title.length > 100
                          ? `${data?.data.title.substring(0, 100)}...`
                          : data?.data.title}
                      </Tooltip>
                    </Typography>
                  )}
                </div>
              </Card>
              <AnimationWrapper key={steps[currentStepIndex].key}>
                <div
                  className={cn(
                    "sticky top-[8.15rem] z-30 h-4 w-[calc(80%-1.6rem)] rounded-t-xl",
                    isLastStep
                      ? "bg-neutral-light-100 dark:bg-neutral-dark-100"
                      : "bg-background-main-light pt-0 dark:bg-background-main-dark"
                  )}
                ></div>
              </AnimationWrapper>
            </div>
            <div className="_flexbox__row__start__start relative h-full w-full gap-8">
              <div className="h-full w-[80%] overflow-y-auto">
                <AnimationWrapper key={steps[currentStepIndex].key}>
                  <Card
                    className={cn(
                      "_flexbox__col__start__start h-full gap-6",
                      "overflow-y-auto rounded-b-xl rounded-t-none xl:px-8 xl:pb-12 xl:pt-8",
                      isLastStep &&
                        "bg-neutral-light-100 dark:bg-neutral-dark-100"
                    )}
                  >
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
                        "bg-neutral-light-100 dark:bg-neutral-dark-100",
                        isLastStep ? "xl:p-0" : "xl:p-7"
                      )}
                    >
                      {step}
                      <div className="_flexbox__row__start__start w-full gap-8">
                        {!isFirstStep && !isLastStep ? (
                          <Button variant="secondary-hacker" onClick={back}>
                            Previous
                          </Button>
                        ) : null}
                        {isLastStep ? (
                          <div className="_flexbox__col__start__start w-full gap-6">
                            <Card
                              className={cn(
                                "rounded-[10px] bg-neutral-light-90 px-4 py-6 xl:px-7.5 xl:py-7.5 dark:bg-neutral-dark-90",
                                "_flexbox__row__start__start w-full gap-6"
                              )}
                            >
                              <Checkbox
                                checked={isAgreed}
                                onCheckedChange={() => setIsAgreed(!isAgreed)}
                              />
                              <Typography variant="p" affects="normal">
                                By clicking 'Submit Report', you agree to our
                                <Link
                                  href="/terms-and-conditions"
                                  target="_blank"
                                  className="underline"
                                >
                                  Terms and Conditions and
                                </Link>{" "}
                                and acknowledge that you have read our Code of
                                Conduct,{" "}
                                <Link
                                  href="/policy"
                                  target="_blank"
                                  className="underline"
                                >
                                  Privacy Policy
                                </Link>
                                and Disclosure Guidelines.
                              </Typography>
                            </Card>
                            <Button
                              type="button"
                              variant="primary-hacker"
                              isLoading={isPending}
                              disabled={isPending || !isAgreed}
                              onClick={() => onSubmitForm()}
                            >
                              Send Report
                            </Button>
                          </div>
                        ) : (
                          <Button
                            variant="primary-hacker"
                            onClick={next}
                            disabled={disabledButton[currentStepIndex]}
                          >
                            Next
                          </Button>
                        )}
                      </div>
                    </Card>
                  </Card>
                </AnimationWrapper>
              </div>
              <div
                className={cn(
                  "sticky top-[8.8rem] z-40 -mt-12 w-[20%] rounded-xl",
                  isLastStep
                    ? "bg-neutral-light-100 dark:bg-neutral-dark-100"
                    : "bg-background-main-light dark:bg-background-main-dark"
                )}
              >
                <Information
                  lists={informations}
                  activeStep={currentStepIndex + 1}
                />
              </div>
            </div>
          </div>
        </FormProvider>
        <ModalCloseSendReport
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
        <ModalSuccessSubmit isOpen={isSuccess} />
      </Desktop>
    </>
  );
};
export default SendReport;
