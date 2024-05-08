import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { Card, Typography } from "@/core/ui/components";
import { sanitize } from "@/utils/sanitize-input";

const VrpDescriptionCard = ({ data }: { data: CreateVrpType }) => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6",
        "bg-background-page-light dark:bg-background-page-dark",
        "xl:p-7.5"
      )}
    >
      <Typography variant="h6" weight="bold">
        VRP Description
      </Typography>
      <div className="_flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          VRP Type
        </Typography>
        <Typography variant="p" affects="normal">
          {data.type}
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Title
        </Typography>
        <Typography variant="p" affects="normal">
          {data.title}
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Description
        </Typography>
        <article
          dangerouslySetInnerHTML={{
            __html: sanitize(data.description ?? ""),
          }}
        ></article>
      </div>
    </Card>
  );
};
export default VrpDescriptionCard;
