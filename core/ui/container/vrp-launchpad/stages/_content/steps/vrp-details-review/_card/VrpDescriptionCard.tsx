import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";

const VrpDescriptionCard = () => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6",
        "bg-background-page-light dark:bg-background-page-dark",
        "p-7.5"
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
          Lorem ipsum dolor sir amet
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
          Lorem ipsum dolor sir amet
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
        <Typography variant="p" affects="normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Typography>
      </div>
    </Card>
  );
};
export default VrpDescriptionCard;
