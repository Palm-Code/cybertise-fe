import { cn } from "@/core/lib/utils";
import { Card, Switch, Typography } from "@/core/ui/components";
import { BellRing, Megaphone } from "lucide-react";

const CardNews = () => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-3 rounded-xl p-7.5",
        "bg-neutral-light-100 dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography variant="h6" weight="bold" className="inline-flex">
          <Megaphone className="mr-4 h-8 w-8" />
          News
        </Typography>
        <Switch variant="hacker" />
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
