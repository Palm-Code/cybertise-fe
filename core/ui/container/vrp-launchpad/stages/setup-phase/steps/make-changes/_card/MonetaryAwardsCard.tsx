"use client";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ShieldCheck } from "@/core/ui/icons";
import { ChevronRight } from "lucide-react";
import PricingCardList from "./Pricing";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CustomPricing from "./CustomPricing";
import { MonetaryAwardType } from "@/types/admin/vrp-launchpad";

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
}: MonetaryAwardsCardProps) => {
  return (
    <Card className="_flexbox__col__start rounded-md bg-neutral-light-100 p-8 dark:bg-neutral-dark-100">
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
              <PricingCardList data={priceData} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};

type PricingCardListProps = {
  data: MonetaryAwardsCardProps[];
};

const MonetaryAwardCardList = ({ data }: PricingCardListProps) => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (category: string) => {
    setActiveCard((prevActiveCard) =>
      prevActiveCard === category ? null : category
    );
  };
  return (
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
            activeCard={activeCard === item.category}
            handleClickExpand={() => handleCardClick(item.category)}
          />
        ))}
        <CustomPricing
          handleClickExpand={() => handleCardClick("custom")}
          activeCard={activeCard === "custom"}
        />
      </div>
    </div>
  );
};

export default MonetaryAwardCardList;
