import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";

interface I_VRPCard {
  onClickSeeDetails: () => void;
}

const VRPCard = ({ onClickSeeDetails }: I_VRPCard) => {
  return (
    <AnimationWrapper>
      <Card>
        <div className="_flexbox__col__start__start w-full gap-12">
          <Typography variant="p" affects="large" weight="semibold">
            VRP Title 1
          </Typography>
          <div className="_flexbox__row__center__between w-full">
            <div className="grid grid-flow-col gap-4">
              <Badge variant="url">Domain</Badge>
              <Badge variant="url">Domain</Badge>
              <Badge variant="url">Domain</Badge>
              <Badge variant="url">Domain</Badge>
            </div>
            <Button variant="primary-hacker" onClick={onClickSeeDetails}>
              See Details
            </Button>
          </div>
        </div>
      </Card>
    </AnimationWrapper>
  );
};
export default VRPCard;
