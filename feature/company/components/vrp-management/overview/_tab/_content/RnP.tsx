import { Card, Tiptap, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import { sanitize } from "@/utils/sanitize-input";
import { useTranslations } from "next-intl";

const RnP = ({ data }: { data: string | null }) => {
  const t = useTranslations("VRPManagement.overview.tabs");
  return (
    <AnimationWrapper className="!px-0">
      <Card className="px-8 py-12">
        <div className="_flexbox__col__start__start w-full gap-6">
          <Typography
            variant="p"
            affects="extralarge"
            weight="bold"
          >
            {t("rules")}
          </Typography>
          <article>
            <Tiptap
              showing
              description={sanitize(data as string)}
            />
          </article>
        </div>
      </Card>
    </AnimationWrapper>
  );
};
export default RnP;
