import { borderColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { Card, Checkbox, Typography } from "@/core/ui/components";
import { checkboxVariants } from "@/core/ui/components/checkbox/checkbox";
import { Role } from "@/types/admin/sidebar";
import { PricingProps } from "@/types/admin/vrp-launchpad";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";

const PricingCard = ({
  tier,
  list,
  variant = "company",
  onClickCard,
  value,
  category,
}: PricingProps & {
  value: string;
  variant?: keyof typeof Role;
  onClickCard: (
    value: { value: number; label: string }[],
    category: string
  ) => void;
  category?: string;
}) => {
  const checked = value === category;
  return (
    <Card
      className={cn(
        "cursor-pointer rounded-[10px] xl:px-4 xl:py-7.5",
        "_flexbox__col__start__start w-full gap-6 border",
        checked ? borderColor[variant] : "border-transparent",
        checked
          ? "bg-background-main-light dark:bg-background-main-dark"
          : "bg-neutral-light-90 hover:bg-background-main-light dark:bg-neutral-dark-90 hover:dark:bg-background-main-dark"
      )}
      onClick={() => onClickCard(list, category)}
    >
      <div className="_flexbox__row__start gap-6">
        <Checkbox
          variant={variant as keyof typeof checkboxVariants}
          checked={checked}
        />
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
  value: string;
  variant?: keyof typeof Role;
  onClickCard: (
    value: { value: number; label: string }[],
    category: string
  ) => void;
};

const PricingCardList = ({
  data,
  variant = "company",
  onClickCard,
  value,
}: PricingCardListProps) => {
  return data.map((data, idx) => (
    <PricingCard
      value={value}
      key={`list-make-changes-card-${idx}`}
      tier={data.tier}
      list={data.list}
      variant={variant}
      onClickCard={onClickCard}
      category={data.category}
    />
  ));
};

export default PricingCardList;
