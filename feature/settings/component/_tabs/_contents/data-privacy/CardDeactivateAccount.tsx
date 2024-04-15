import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ChevronRight, CircleHelp, FileKey2, ShieldX } from "lucide-react";

const CardDeactivateAccount = () => {
  return (
    <Card
      isClickable
      href={"#"}
      className={cn(
        "_flexbox__col__start__start w-full gap-3 rounded-xl px-4 py-8 xl:p-7.5",
        "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography variant="h6" weight="bold" className="xl:inline-flex">
          <ShieldX className="mb-4 mr-4 h-8 w-8 xl:mb-0" />
          Find out how you can deactivate your account
        </Typography>
        <ChevronRight className="hidden xl:block" />
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
