import { Button, Typography } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import MonetaryAwardsCard from "./_card/MonetaryAwardsCard";
import TargetAssetListCard from "./_card/TargetAssetListCard";
import Notes from "./_card/Notes";

interface I_VrpDetailsReviewProps {
  onClickNext: () => void;
}

const VrpDetailsReview = ({ onClickNext }: I_VrpDetailsReviewProps) => {
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <Typography variant="h5" weight="bold">
        Review VRP {"Title 1"}
      </Typography>
      <VrpDescriptionCard />
      <MonetaryAwardsCard />
      <TargetAssetListCard />
      <Notes />
      <Button variant="primary-mediator" onClick={onClickNext}>
        Next
      </Button>
    </div>
  );
};
export default VrpDetailsReview;
