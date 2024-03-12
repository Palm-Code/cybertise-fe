import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ChevronRight, CircleHelp, FileKey2, ShieldX } from "lucide-react";

const CardDeactivateAccount = () => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-3 rounded-xl p-7.5",
        "bg-neutral-light-100 dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography variant="h6" weight="bold" className="inline-flex">
          <ShieldX className="mr-4 h-8 w-8" />
          Find out how you can deactivate your account
        </Typography>
        <ChevronRight />
      </div>
      <Typography
        variant="p"
        affects="normal"
        className="text-neutral-light-40 dark:text-neutral-dark-40"
      >
        Frequently Asked Question
      </Typography>
    </Card>
  );
};
export default CardDeactivateAccount;
