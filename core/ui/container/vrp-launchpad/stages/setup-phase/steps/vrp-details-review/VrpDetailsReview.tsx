import { Typography } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import MonetaryAwardsCard from "./_card/MonetaryAwardsCard";

const VrpDetailsReview = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <Typography variant="h5" weight="bold">
        Review VRP {"Title 1"}
      </Typography>
      <VrpDescriptionCard />
      <MonetaryAwardsCard />
    </div>
  );
};
export default VrpDetailsReview;
