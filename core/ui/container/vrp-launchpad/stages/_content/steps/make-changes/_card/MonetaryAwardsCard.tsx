"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card, Typography } from "@/core/ui/components";
import { ShieldCheck } from "@/core/ui/icons";
import { ChevronRight } from "lucide-react";
import PricingCardList from "./Pricing";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomPricing from "./CustomPricing";
import { MonetaryAwardType } from "@/types/admin/vrp-launchpad";
import { useFormContext } from "react-hook-form";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { isObjectEmpty } from "@/utils/form-fill-validation";

export type MonetaryAwardsCardProps = MonetaryAwardType & {
  activeCard?: boolean;
  handleClickExpand?: () => void;
};

const MonetaryAwardsCard = ({
  title,
  category,
  priceData,
  handleClickExpand,
  activeCard,
  variant = "company",
}: MonetaryAwardsCardProps) => {
  const { watch, setValue } = useFormContext<CreateVrpType>();
  const forms = watch();

  return (
    <Card className="_flexbox__col__start rounded-md bg-neutral-light-100 xl:p-8 dark:bg-neutral-dark-100">
      <button
        type="button"
        title="Expand"
        className="_flexbox__row__center__start w-full gap-6 focus:outline-none active:outline-none"
        onClick={handleClickExpand}
      >
        <ChevronRight
          className={cn(
            "cursor-pointer transition-transform duration-300",
            activeCard ? "rotate-90" : "rotate-0"
          )}
        />
        <Typography variant="p" affects="large" weight="semibold">
          {title}
        </Typography>
        <ShieldCheck category={category} />
      </button>
      <AnimatePresence>
        {activeCard && (
          <motion.div
            key="content"
            initial={{ height: 0, marginTop: "0" }}
            animate={{ height: "auto", marginTop: "24px" }}
            exit={{ height: 0, marginTop: "0" }}
            transition={{ duration: 0.3 }}
            className="w-full overflow-hidden"
          >
            <div className="grid w-full grid-cols-3 gap-6">
              <PricingCardList
                value={forms.monetary_awards_level}
                variant={variant}
                data={priceData}
                onClickCard={(v, c) => {
                  setValue("monetary_awards_level", c);
                  setValue("monetary_awards_low", v[0].value);
                  setValue("monetary_awards_medium", v[1].value);
                  setValue("monetary_awards_high", v[2].value);
                  setValue("monetary_awards_critical", v[3].value);
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

interface I_MonetaryAwardCardList<T extends boolean> {
  isCompany?: T;
  onClickNext?: T extends true ? () => void : undefined;
  onClickPrev?: T extends true ? () => void : undefined;
}
type PricingCardListProps = {
  data: MonetaryAwardsCardProps[];
  variant?: "hacker" | "company" | "mediator";
} & I_MonetaryAwardCardList<boolean>;

const MonetaryAwardCardList = ({
  data,
  isCompany = false,
  onClickNext,
  onClickPrev,
  variant = "company",
}: PricingCardListProps) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const { watch, setValue } = useFormContext<CreateVrpType>();
  const forms = watch();

  const handleCardClick = (category: string) => {
    const oldValue = forms.monetary_awards_level;
    setValue(
      "monetary_awards_level",
      oldValue === category ? oldValue : category
    );
    setActiveCard((prevActiveCard) =>
      prevActiveCard === category ? null : category
    );
  };

  const disabledButton = isObjectEmpty({
    monetary_awards_level: forms.monetary_awards_level,
    monetary_awards_low: forms.monetary_awards_low,
    monetary_awards_medium: forms.monetary_awards_medium,
    monetary_awards_high: forms.monetary_awards_high,
    monetary_awards_critical: forms.monetary_awards_critical,
  });

  return (
    <>
      <div
        className={cn(
          "w-full rounded-[10px] bg-background-page-light p-7.5 dark:bg-background-page-dark",
          "_flexbox__col__start__start gap-6"
        )}
      >
        <Typography variant="h6" weight="bold">
          Monetary Awards
        </Typography>
        <div className="_flexbox__col__start w-full gap-6">
          {data.map((item, idx) => (
            <MonetaryAwardsCard
              key={idx}
              title={item.title}
              category={item.category}
              priceData={item.priceData}
              activeCard={item.priceData.some(
                (i) => i.category === forms.monetary_awards_level
              )}
              variant={variant}
              handleClickExpand={() =>
                handleCardClick(item.priceData[0].category)
              }
            />
          ))}
          <CustomPricing
            value={forms}
            setValue={setValue}
            handleClickExpand={() => handleCardClick("custom")}
            activeCard={
              activeCard === "custom" ||
              forms.monetary_awards_level === "custom"
            }
          />
        </div>
      </div>
      {isCompany && (
        <div className="_flexbox__row__center gap-8">
          <Button variant="secondary-company" onClick={onClickPrev}>
            Previous
          </Button>
          <Button
            variant="primary-company"
            disabled={disabledButton}
            onClick={onClickNext}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};

export default MonetaryAwardCardList;
