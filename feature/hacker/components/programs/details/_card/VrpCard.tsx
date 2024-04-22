import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";

interface I_VRPCard {
  onClickSeeDetails: () => void;
}

const VRPCard = ({ onClickSeeDetails }: I_VRPCard) => {
  return (
    <AnimationWrapper>
      <Mobile className="px-6">
        <Card isButton onClick={onClickSeeDetails}>
          <div className="_flexbox__col__start__start w-full gap-12">
            <Typography variant="p" affects="large" weight="semibold">
              VRP Title 1
            </Typography>
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutal-light-20 dark:text-neutral-dark-20"
              >
                Asset type Available
              </Typography>
              <div className="flex flex-wrap gap-4">
                <Badge variant="url">Domain</Badge>
                <Badge variant="default">Hardware/IOT</Badge>
                <Badge variant="default">Android:Playstore</Badge>
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card isButton onClick={onClickSeeDetails}>
          <div className="_flexbox__col__start__start w-full gap-12">
            <Typography variant="p" affects="large" weight="semibold">
              VRP Title 1
            </Typography>
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutal-light-20 dark:text-neutral-dark-20"
              >
                Asset type Available
              </Typography>
              <div className="grid grid-flow-col gap-4">
                <Badge variant="url">Domain</Badge>
                <Badge variant="default">Hardware/IOT</Badge>
                <Badge variant="default">Android:Playstore</Badge>
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </AnimationWrapper>
  );
};
export default VRPCard;
