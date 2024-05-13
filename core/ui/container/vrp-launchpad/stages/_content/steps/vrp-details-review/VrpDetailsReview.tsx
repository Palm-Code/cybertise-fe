import { Button, Typography } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import MonetaryAwardsCard from "./_card/MonetaryAwardsCard";
import TargetAssetListCard from "./_card/TargetAssetListCard";
import Notes from "./_card/Notes";
import { CheckCircle2, FilePenLine } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { SortFilterType } from "@/types/admin/dashboard";
import RulesAndPolicies from "./_card/RulesAndPolicies";
import { Role } from "@/types/admin/sidebar";
import { cn } from "@/core/lib/utils";

interface I_VrpDetailsReviewProps {
  onClickNext?: () => void;
  isLastStep?: boolean;
  onClickEdit?: () => void;
  onClickRevise?: () => void;
  variant?: keyof typeof Role;
  assetTypes: SortFilterType[];
  isLoading?: boolean;
  currentStep?: string;
}

const VrpDetailsReview = ({
  onClickNext,
  isLastStep = false,
  onClickEdit,
  variant = "mediator",
  isLoading = false,
  currentStep = "Phase1",
  onClickRevise = () => {},
}: I_VrpDetailsReviewProps) => {
  const { getValues } = useFormContext<CreateVrpType>();
  const forms = getValues();
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          {isLastStep ? "VRP Details" : `Review ${forms.title}`}
        </Typography>
        {isLastStep ||
          (currentStep === "Published" && (
            <Button
              variant={`tertiary-${variant}`}
              prefixIcon={<FilePenLine />}
              onClick={onClickEdit}
            >
              Edit Report
            </Button>
          ))}
      </div>
      {currentStep === "Phase5" && (
        <div
          className={cn(
            "_flexbox__row__center__between w-full rounded-[10px] bg-emerald-normal p-4"
          )}
        >
          <Typography variant="p" affects="normal" weight="semibold">
            VRP Approved
          </Typography>
          <CheckCircle2 />
        </div>
      )}
      <VrpDescriptionCard data={forms} />
      <MonetaryAwardsCard data={forms} />
      {!!forms.rules && !!forms.policies && <RulesAndPolicies isReview />}
      <TargetAssetListCard data={forms} />
      <Notes data={forms.notes} />
      {variant === "company" ? (
        currentStep === "Phase1" ||
        currentStep === "Phase3" ||
        currentStep === "Phase5" ||
        currentStep === "Published" ? (
          <Button
            variant="primary-company"
            onClick={onClickNext}
            isLoading={isLoading}
            disabled={isLoading}
          >
            {currentStep === "Phase5" || currentStep === "Published"
              ? "Publish"
              : "Send to Mediator"}
          </Button>
        ) : null
      ) : (
        currentStep !== "Phase5" && (
          <div className="_flexbox__row__start__start gap-4">
            <Button
              variant={
                currentStep === "Phase4" && isLastStep
                  ? "secondary-mediator"
                  : "primary-mediator"
              }
              isLoading={isLoading}
              disabled={isLoading}
              onClick={
                isLastStep && currentStep === "Phase4"
                  ? onClickRevise
                  : onClickNext
              }
            >
              {isLastStep ? "Send Revision to Company" : "Next"}
            </Button>
            {currentStep === "Phase4" && isLastStep && (
              <Button
                variant="primary-mediator"
                isLoading={isLoading}
                disabled={isLoading}
                onClick={onClickNext}
              >
                Approve VRP
              </Button>
            )}
          </div>
        )
      )}
    </div>
  );
};
export default VrpDetailsReview;
