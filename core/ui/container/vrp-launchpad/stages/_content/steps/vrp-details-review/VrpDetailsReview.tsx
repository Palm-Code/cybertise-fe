import { Button, Typography } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import MonetaryAwardsCard from "./_card/MonetaryAwardsCard";
import TargetAssetListCard from "./_card/TargetAssetListCard";
import Notes from "./_card/Notes";
import { FilePenLine } from "lucide-react";

interface I_VrpDetailsReviewProps {
  onClickNext?: () => void;
  isLastStep?: boolean;
  onClickEdit?: () => void;
  variant?: "mediator" | "company";
}

const VrpDetailsReview = ({
  onClickNext,
  isLastStep = false,
  onClickEdit,
  variant = "mediator",
}: I_VrpDetailsReviewProps) => {
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          {isLastStep ? "VRP Details" : "Review VRP Title 1"}
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
      <VrpDescriptionCard />
      <MonetaryAwardsCard />
      <TargetAssetListCard />
      <Notes />
      {variant === "company" ? (
        <Button variant="primary-company" onClick={onClickNext}>
          Send to Mediator
        </Button>
      ) : (
        <Button variant="primary-mediator" onClick={onClickNext}>
          {isLastStep ? "Continue" : "Next"}
        </Button>
      )}
    </div>
  );
};
export default VrpDetailsReview;
