"use client";
import { cn } from "@/core/lib/utils";
import { Card, Input, Typography } from "@/core/ui/components";
import { AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";

interface CustomPricingProps {
  handleClickExpand: () => void;
  activeCard: boolean;
}

const CustomPricing = ({
  handleClickExpand,
  activeCard,
}: CustomPricingProps) => {
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
          Custom
        </Typography>
      </button>
      <AnimatePresence>
        {activeCard && (
          <motion.div
            key="content"
            initial={{ height: 0, marginTop: "0px" }}
            animate={{ height: "auto", marginTop: "24px" }}
            exit={{ height: 0, marginTop: "0px" }}
            transition={{ duration: 0.3 }}
            className="grid w-full grid-cols-2 gap-6 overflow-hidden"
          >
            <Input label="Low" isPrice />
            <Input label="Medium" isPrice />
            <Input label="High" isPrice />
            <Input label="Critical" isPrice />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
export default CustomPricing;
