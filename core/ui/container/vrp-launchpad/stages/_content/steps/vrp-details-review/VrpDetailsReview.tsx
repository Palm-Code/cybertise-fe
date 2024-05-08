import { Button, Typography } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import MonetaryAwardsCard from "./_card/MonetaryAwardsCard";
import TargetAssetListCard from "./_card/TargetAssetListCard";
import Notes from "./_card/Notes";
import { FilePenLine } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { SortFilterType } from "@/types/admin/dashboard";
import RulesAndPolicies from "./_card/RulesAndPolicies";

interface I_VrpDetailsReviewProps {
  onClickNext?: () => void;
  isLastStep?: boolean;
  onClickEdit?: () => void;
  variant?: "mediator" | "company";
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
}: I_VrpDetailsReviewProps) => {
  const { getValues } = useFormContext<CreateVrpType>();
  const forms = getValues();
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          {isLastStep ? "VRP Details" : `Review ${forms.title}`}
        </Typography>
        {isLastStep && (
          <Button
            variant={`tertiary-${variant}`}
            prefixIcon={<FilePenLine />}
            onClick={onClickEdit}
          >
            Edit Report
          </Button>
        )}
      </div>
      <VrpDescriptionCard data={forms} />
      <MonetaryAwardsCard data={forms} />
      {!!forms.rules && !!forms.policies && <RulesAndPolicies isReview />}
      <TargetAssetListCard data={forms} />
      <Notes data={forms.notes} />
      {currentStep === "Phase1" || currentStep === "Phase3" ? (
        variant === "company" ? (
          <Button
            variant="primary-company"
            onClick={onClickNext}
            isLoading={isLoading}
          >
            Send to Mediator
          </Button>
        ) : (
          <Button variant="primary-mediator" onClick={onClickNext}>
            {isLastStep ? "Continue" : "Next"}
          </Button>
        )
      ) : null}
    </div>
  );
};
export default VrpDetailsReview;
