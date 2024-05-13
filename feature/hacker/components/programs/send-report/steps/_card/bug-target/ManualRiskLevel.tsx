import { cn } from "@/core/lib/utils";
import {
  Badge,
  badgeVariants,
  Card,
  Checkbox,
  Typography,
} from "@/core/ui/components";
import { Slider } from "@/core/ui/components/slider/slider";
import { I_CsvssCalculatorProps } from "./CsvssCalculator";
import { motion } from "framer-motion";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { useFormContext } from "react-hook-form";
import { riskLevelCalculator } from "@/utils/risk-level-calculator";

const ManualRiskLevel = ({
  isManualRisk,
  onChangeManualRisk,
}: I_CsvssCalculatorProps) => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<SendReportRequestType>();

  const forms = getValues();

  return (
    <Card
      className={cn(
        "rounded-md bg-neutral-light-90 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-90",
        "_flexbox__col__start__start gap-4 transition-all duration-100"
      )}
    >
      <div className="_flexbox__row__center__between w-full">
        <div className="_flexbox__row__start__start gap-4">
          <Checkbox
            variant="hacker"
            checked={isManualRisk}
            disabled={isManualRisk}
            onCheckedChange={onChangeManualRisk}
          />
          <Typography
            variant="p"
            affects="normal"
            className="text-neutral-light-40 dark:text-neutral-dark-40"
          >
            Set Risk Level Manually
          </Typography>
        </div>
        {isManualRisk && (
          <Badge
            variant={
              riskLevelCalculator(
                forms.risk_level
              ).toLowerCase() as keyof typeof badgeVariants
            }
          >
            {forms.risk_level} | {riskLevelCalculator(forms.risk_level)} Risk
          </Badge>
        )}
      </div>
      {isManualRisk && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="_flexbox__col__start__start w-full gap-3"
        >
          <div className="grid w-full grid-cols-11 place-items-center gap-4">
            <div className="col-span-11 flex h-11 w-full items-center justify-between gap-4">
              {Array.from({ length: 11 }).map((_, idx) => (
                <Typography
                  key={`risk-level-${idx}`}
                  variant="p"
                  affects="normal"
                  className={cn(
                    idx < 4 ? "ml-3" : idx === 4 ? "ml-2.5" : "mr-2.5",
                    idx === forms.risk_level
                      ? "text-2xl font-extrabold"
                      : "text-neutral-light-50 dark:text-neutral-dark-50"
                  )}
                >
                  {idx}
                </Typography>
              ))}
            </div>
            <Slider
              defaultValue={[0]}
              value={[forms.risk_level]}
              onValueChange={(v) =>
                setValue("risk_level", v[0], { shouldValidate: true })
              }
              max={10}
              step={1}
              className="col-span-11 w-full"
            />
          </div>
        </motion.div>
      )}
    </Card>
  );
};
export default ManualRiskLevel;
