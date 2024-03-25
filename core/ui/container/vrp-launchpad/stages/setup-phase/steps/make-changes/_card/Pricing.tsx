import { cn } from "@/core/lib/utils";
import { Card, Checkbox, Typography } from "@/core/ui/components";
import { PricingProps } from "@/types/admin/vrp-launchpad";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";

const PricingCard = ({ tier, list, checked }: PricingProps) => {
  return (
    <Card
      className={cn(
        "rounded-[10px] bg-neutral-light-90 px-4 py-7.5 dark:bg-neutral-dark-90",
        "_flexbox__col__start__start w-full gap-6"
      )}
    >
      <div className="_flexbox__row__start gap-6">
        <Checkbox variant="mediator" checked={checked} />
        <Typography variant="h6" weight="bold">
          {tier}
        </Typography>
      </div>
      {list.map((data, idx) => (
        <div
          className="_flexbox__row__center__between w-full"
          key={`list-make-changes-${idx}`}
        >
          <Typography
            variant="p"
            affects="normal"
            className="text-neutral-light-40 dark:text-neutral-dark-40"
          >
            {data.label}
          </Typography>
          <Typography variant="p" affects="normal">
            {currencyFormatters.NumberToEUR(data.value ?? 0)}
          </Typography>
        </div>
      ))}
    </Card>
  );
};

type PricingCardListProps = {
  data: PricingProps[];
};

const PricingCardList = ({ data }: PricingCardListProps) => {
  return data.map((data, idx) => (
    <PricingCard
      key={`list-make-changes-card-${idx}`}
      tier={data.tier}
      list={data.list}
      checked={data.checked}
    />
  ));
};

export default PricingCardList;
