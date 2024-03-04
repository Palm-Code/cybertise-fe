import { cn } from "@/core/lib/utils";
import { Badge, Card, Checkbox, Typography } from "@/core/ui/components";
import { Slider } from "@/core/ui/components/slider/slider";
import { I_CsvssCalculatorProps } from "./CsvssCalculator";
import { motion } from "framer-motion";

const ManualRiskLevel = ({
  isManualRisk,
  onChangeManualRisk,
}: I_CsvssCalculatorProps) => {
  return (
    <Card
      className={cn(
        "rounded-md bg-neutral-light-90 px-4 py-4.5 dark:bg-neutral-dark-90",
        "_flexbox__col__start__start gap-4 transition-all duration-100"
      )}
    >
      <div className="_flexbox__row__center__between w-full">
        <div className="_flexbox__row__start__start gap-4">
          <Checkbox
            variant="hacker"
            checked={isManualRisk}
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
        {isManualRisk && <Badge variant="default">50 (Medium Risk)</Badge>}
      </div>
      {isManualRisk && (
        <motion.div
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="_flexbox__col__start__start w-full gap-2"
        >
          <div className="grid w-full grid-cols-10 place-items-center gap-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <Typography
                key={`risk-level-${idx}`}
                variant="p"
                affects="normal"
                className={cn(
                  idx + 1 === 5
                    ? "text-2xl font-extrabold"
                    : "text-neutral-light-50 dark:text-neutral-dark-50"
                )}
              >
                {idx + 1}
              </Typography>
            ))}
            <Slider
              defaultValue={[50]}
              max={100}
              step={1}
              className="col-span-10 w-full"
            />
          </div>
        </motion.div>
      )}
    </Card>
  );
};
export default ManualRiskLevel;
