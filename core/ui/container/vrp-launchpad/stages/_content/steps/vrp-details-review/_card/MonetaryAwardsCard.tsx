import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { Card, Typography } from "@/core/ui/components";
import { ShieldCheck } from "@/core/ui/icons";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";

const MonetaryAwardsCard = ({ data }: { data: CreateVrpType }) => {
  const category = data?.monetary_awards_level?.split("-")[0] || "custom";

  return (
    <>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-background-page-light dark:bg-background-page-dark",
          "xl:p-7.5"
        )}
      >
        <Typography variant="h6" weight="bold">
          Monetary Awards
        </Typography>
        <div className="grid grid-cols-[auto_1fr] gap-4">
          {data.monetary_awards_level !== "custom" && (
            <ShieldCheck category={category as "S" | "M" | "L" | "XL"} />
          )}
          <Typography variant="p" affects="normal">
            Category{" "}
            {data.monetary_awards_level === "custom" ? "Custom" : category}
          </Typography>
        </div>
        <div className="grid w-full grid-cols-2 gap-6">
          <Card className="rounded-md bg-neutral-light-100 xl:p-4.5 dark:bg-neutral-dark-100">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              Low
            </Typography>
            <Typography variant="p" affects="normal">
              {currencyFormatters.NumberToEUR(data.monetary_awards_low ?? 0)}
            </Typography>
          </Card>
          <Card className="rounded-md bg-neutral-light-100 xl:p-4.5 dark:bg-neutral-dark-100">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              High
            </Typography>
            <Typography variant="p" affects="normal">
              {currencyFormatters.NumberToEUR(data.monetary_awards_high ?? 0)}
            </Typography>
          </Card>
          <Card className="rounded-md bg-neutral-light-100 xl:p-4.5 dark:bg-neutral-dark-100">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              Medium
            </Typography>
            <Typography variant="p" affects="normal">
              {currencyFormatters.NumberToEUR(data.monetary_awards_medium ?? 0)}
            </Typography>
          </Card>
          <Card className="rounded-md bg-neutral-light-100 xl:p-4.5 dark:bg-neutral-dark-100">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              Critical
            </Typography>
            <Typography variant="p" affects="normal">
              {currencyFormatters.NumberToEUR(
                data.monetary_awards_critical ?? 0
              )}
            </Typography>
          </Card>
        </div>
      </Card>
    </>
  );
};
export default MonetaryAwardsCard;
