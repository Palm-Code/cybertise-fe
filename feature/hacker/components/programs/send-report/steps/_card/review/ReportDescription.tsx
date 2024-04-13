import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";

interface I_ReportDescriptionProps {
  title: string;
  description: string;
}

const ReportDescriptionCard = ({
  title,
  description,
}: I_ReportDescriptionProps) => {
  return (
    <Card
      className={cn(
        "rounded-[10px] bg-neutral-light-90 px-4 py-6 xl:px-7.5 xl:py-7.5 dark:bg-neutral-dark-90",
        "_flexbox__col__start__start w-full gap-6"
      )}
    >
      <Typography variant="h6" weight="bold">
        Report Description
      </Typography>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Title
        </Typography>
        <Typography variant="p" affects="normal">
          {title}
        </Typography>
      </div>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Description
        </Typography>
        <Typography variant="p" affects="normal">
          {description}
        </Typography>
      </div>
    </Card>
  );
};
export default ReportDescriptionCard;
