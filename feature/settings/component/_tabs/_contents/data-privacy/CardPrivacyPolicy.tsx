import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ChevronRight, FileKey2 } from "lucide-react";

const CardPrivacyPolicy = () => {
  return (
    <Card
      isClickable
      href={"/policy"}
      className={cn(
        "_flexbox__col__start__start w-full gap-3 rounded-xl px-4 py-8 xl:p-7.5",
        "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography variant="h6" weight="bold" className="xl:inline-flex">
          <FileKey2 className="mb-4 mr-4 h-8 w-8 xl:mb-0" />
          Privacy Policy
        </Typography>
        <ChevronRight className="hidden xl:block" />
      </div>
      <Typography
        variant="p"
        affects="normal"
        className="text-neutral-light-40 dark:text-neutral-dark-40"
      >
        Please read the Privacy Policy carefully.
      </Typography>
    </Card>
  );
};
export default CardPrivacyPolicy;
