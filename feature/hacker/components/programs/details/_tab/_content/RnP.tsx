import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { Card, Tiptap, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import { sanitize } from "@/utils/sanitize-input";

const RnP = ({ data }: { data: string | null }) => {
  return (
    <AnimationWrapper className="px-6 xl:px-0">
      <Card className="px-8 py-12">
        <div className="_flexbox__col__start__start w-full gap-6">
          <Typography variant="p" affects="extralarge" weight="bold">
            Rules and policy
          </Typography>
          <article>
            <Tiptap showing description={sanitize(data as string)} />
          </article>
        </div>
      </Card>
    </AnimationWrapper>
  );
};
export default RnP;
