import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ShieldCheck } from "@/core/ui/icons";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";

const MonetaryAwardsCard = () => {
  return (
    <>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-background-page-light dark:bg-background-page-dark",
          "p-7.5"
        )}
      >
        <Typography variant="h6" weight="bold">
          Monetary Awards
        </Typography>

        <Typography variant="p" affects="normal" className="inline-flex gap-4">
          Category XL <ShieldCheck />
        </Typography>
        <div className="grid w-full grid-cols-2 gap-6">
          <Card className="rounded-md bg-neutral-light-100 p-4.5 dark:bg-neutral-dark-100">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              Low
            </Typography>
            <Typography variant="p" affects="normal">
              {currencyFormatters.NumberToEUR(100)}
            </Typography>
          </Card>
          <Card className="rounded-md bg-neutral-light-100 p-4.5 dark:bg-neutral-dark-100">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              High
            </Typography>
            <Typography variant="p" affects="normal">
              {currencyFormatters.NumberToEUR(100)}
            </Typography>
          </Card>
          <Card className="rounded-md bg-neutral-light-100 p-4.5 dark:bg-neutral-dark-100">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              Medium
            </Typography>
            <Typography variant="p" affects="normal">
              {currencyFormatters.NumberToEUR(100)}
            </Typography>
          </Card>
          <Card className="rounded-md bg-neutral-light-100 p-4.5 dark:bg-neutral-dark-100">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              Critical
            </Typography>
            <Typography variant="p" affects="normal">
              {currencyFormatters.NumberToEUR(100)}
            </Typography>
          </Card>
        </div>
      </Card>
    </>
  );
};
export default MonetaryAwardsCard;
