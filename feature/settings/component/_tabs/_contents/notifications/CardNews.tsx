import { cn } from "@/core/lib/utils";
import { Card, Switch, Typography } from "@/core/ui/components";
import { Megaphone } from "lucide-react";

interface I_CardNewsProps {
  variant: "hacker" | "mediator" | "company";
}

const CardNews = ({ variant }: I_CardNewsProps) => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-3 rounded-xl px-4 py-8 xl:p-7.5",
        "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography
          variant="h6"
          weight="bold"
          className="block space-y-4 xl:inline-flex"
        >
          <Megaphone className="mr-4 h-8 w-8" />
          News
        </Typography>
        <Switch variant={variant} />
      </div>
      <Typography
        variant="p"
        affects="normal"
        className="text-neutral-light-40 dark:text-neutral-dark-40"
      >
        News notifications will send you updates from others
      </Typography>
    </Card>
  );
};
export default CardNews;
