import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";

const Thanks = ({ data }: { data?: string }) => {
  return (
    <AnimationWrapper className="px-6 xl:px-0">
      <Card className="px-8 py-12">
        <div className="_flexbox__col__start__start w-full gap-6">
          <Typography variant="p" affects="normal">
            {data}
          </Typography>
        </div>
      </Card>
    </AnimationWrapper>
  );
};
export default Thanks;
