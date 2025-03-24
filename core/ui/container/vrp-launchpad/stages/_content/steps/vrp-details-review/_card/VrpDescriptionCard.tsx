import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { Badge, Card, Tiptap, Typography } from "@/core/ui/components";
import { sanitize } from "@/utils/sanitize-input";
import { useTranslations } from "next-intl";

const VrpDescriptionCard = ({ data }: { data: CreateVrpType }) => {
  const t = useTranslations("VRPLaunchpad.phase.vrp_details.vrp_description");
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6",
        "bg-background-page-light dark:bg-background-page-dark",
        "xl:p-7.5"
      )}
    >
      <Typography
        variant="h6"
        weight="bold"
      >
        {t("header_title")}
      </Typography>
      <div className="_flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("type")}
        </Typography>
        <Badge variant="default">{data.type}</Badge>
      </div>
      <div className="_flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("title")}
        </Typography>
        <Typography
          variant="p"
          affects="normal"
        >
          {data.title}
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("description")}
        </Typography>
        <article>
          <Tiptap
            showing
            description={sanitize(data?.description as string)}
          />
        </article>
      </div>
    </Card>
  );
};
export default VrpDescriptionCard;
