import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";

const RnP = ({ data }: { data?: string }) => {
  return (
    <AnimationWrapper className="!px-0">
      <Card className="px-8 py-12">
        <div className="_flexbox__col__start__start w-full gap-6">
          <Typography variant="p" affects="extralarge" weight="bold">
            Rules and policy
          </Typography>
          <Typography variant="p" affects="normal">
            {data}
          </Typography>
        </div>
      </Card>
    </AnimationWrapper>
  );
};
export default RnP;
