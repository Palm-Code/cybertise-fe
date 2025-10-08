"use client";
import { cn } from "@/core/lib/utils";
import { Card, Input, Typography } from "@/core/ui/components";
import { AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { NumericFormat } from "react-number-format";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { UseFormSetValue } from "react-hook-form";
import { useTranslations } from "next-intl";

interface CustomPricingProps {
  handleClickExpand: () => void;
  activeCard: boolean;
  value: CreateVrpType;
  setValue: UseFormSetValue<CreateVrpType>;
}

const CustomPricing = ({
  handleClickExpand,
  activeCard,
  value,
  setValue,
}: CustomPricingProps) => {
  const t = useTranslations("VRPLaunchpad.phase.vrp_details.monetary_awards");
  return (
    <Card className="_flexbox__col__start rounded-md bg-neutral-light-100 dark:bg-neutral-dark-100 xl:p-8">
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
        <Typography
          variant="p"
          affects="large"
          weight="semibold"
        >
          {t("custom")}
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
            <Input
              label="Low"
              value={value.monetary_awards_low}
              isPrice
              onChangeNumberValue={(value) =>
                setValue("monetary_awards_low", value.floatValue as number, {
                  shouldValidate: true,
                })
              }
            />
            <Input
              label="Medium"
              value={value.monetary_awards_medium}
              isPrice
              onChangeNumberValue={(value) =>
                setValue("monetary_awards_medium", value.floatValue as number, {
                  shouldValidate: true,
                })
              }
            />
            <Input
              label="High"
              value={value.monetary_awards_high}
              isPrice
              onChangeNumberValue={(value) =>
                setValue("monetary_awards_high", value.floatValue as number, {
                  shouldValidate: true,
                })
              }
            />
            <Input
              label="Critical"
              value={value.monetary_awards_critical}
              isPrice
              onChangeNumberValue={(value) =>
                setValue(
                  "monetary_awards_critical",
                  value.floatValue as number,
                  {
                    shouldValidate: true,
                  }
                )
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
export default CustomPricing;
