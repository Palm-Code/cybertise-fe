import { Button, Card, Checkbox, Typography } from "@/core/ui/components";
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
import { useState } from "react";

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
  onClickNext = () => {},
  isLastStep = false,
  onClickEdit,
  variant = "mediator",
  isLoading = false,
  currentStep = "Phase1",
  onClickRevise = () => {},
}: I_VrpDetailsReviewProps) => {
  const { getValues } = useFormContext<CreateVrpType>();
  const forms = getValues();
  const [checked, setChecked] = useState<boolean>(false);
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          {isLastStep ? "VRP Details" : `Review ${forms.title}`}
        </Typography>
        {isLastStep ||
        currentStep === "Published" ||
        currentStep === "Phase5" ? (
          <Button
            variant={`tertiary-${variant}`}
            prefixIcon={<FilePenLine />}
            onClick={onClickEdit}
          >
            Edit Report
          </Button>
        ) : null}
      </div>
      {(currentStep === "Phase5" || currentStep === "Published") && (
        <div
          className={cn(
            "_flexbox__row__center__between w-full rounded-[10px] bg-emerald-normal p-4 !text-white"
          )}
        >
          <Typography variant="p" affects="normal" weight="semibold">
            VRP {currentStep === "Published" ? "Published" : "Approved"}
          </Typography>
          <CheckCircle2 />
        </div>
      )}
      <VrpDescriptionCard data={forms} />
      <MonetaryAwardsCard data={forms} />
      {!!forms.rules && !!forms.policies && <RulesAndPolicies isReview />}
      <TargetAssetListCard data={forms} />
      <Notes data={forms.notes} />
      {currentStep === "Phase5" && (
        <Card
          className={cn(
            "_flexbox__row__start__start w-full gap-4",
            "bg-background-page-light dark:bg-background-page-dark",
            "xl:p-7.5"
          )}
        >
          <Checkbox
            variant="company"
            checked={checked}
            onCheckedChange={() => setChecked(!checked)}
          />
          <Typography variant="p" affects="default">
            By clicking 'Submit Report', you agree to our Terms and Conditions
            and acknowledge that you have read our Code of Conduct, Privacy
            Policy and Disclosure Guidelines.
          </Typography>
        </Card>
      )}
      {variant === "company" ? (
        currentStep === "Phase1" ||
        currentStep === "Phase3" ||
        currentStep === "Phase5" ||
        (currentStep === "Published" && isLastStep) ? (
          <Button
            variant="primary-company"
            onClick={() =>
              (currentStep === "Published" && isLastStep) ||
              (currentStep === "Phase5" && isLastStep)
                ? onClickRevise()
                : onClickNext()
            }
            isLoading={isLoading}
            disabled={isLoading || (currentStep === "Phase5" && !checked)}
          >
            {currentStep === "Phase5" && !isLastStep
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
