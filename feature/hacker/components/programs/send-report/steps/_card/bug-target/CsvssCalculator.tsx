import { cn } from "@/core/lib/utils";
import { Badge, Card, Checkbox, Typography } from "@/core/ui/components";
import { csvss_calculator } from "@/feature/hacker/constants/programs";

export interface I_CsvssCalculatorProps {
  isManualRisk: boolean;
  onChangeManualRisk: () => void;
}

const CsvssCalculator = ({
  isManualRisk,
  onChangeManualRisk,
}: I_CsvssCalculatorProps) => {
  return (
    <Card
      className={cn(
        "rounded-md px-4 py-4.5 transition-all duration-100",
        !isManualRisk
          ? "bg-neutral-light-80 dark:bg-neutral-dark-80 "
          : "bg-neutral-light-90 dark:bg-neutral-dark-90"
      )}
    >
      <div className="_flexbox__col__center__start w-full gap-4">
        <div className="_flexbox__row__center__between w-full">
          <div className="_flexbox__row__center gap-4">
            <Checkbox
              variant="hacker"
              checked={!isManualRisk}
              onCheckedChange={onChangeManualRisk}
            />
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              CVSS Calculator
            </Typography>
          </div>
          {!isManualRisk && <Badge variant="default">0 (No Risk)</Badge>}
        </div>
        {!isManualRisk && (
          <div className="relative grid h-fit w-full grid-cols-2 gap-4">
            {csvss_calculator.map((item, idx) => (
              <Card
                key={`card-csvss-${idx}`}
                className={cn(
                  "_flexbox__col__start__start gap-4 rounded-md  px-4 py-4.5",
                  "transition-colors duration-100",
                  isManualRisk
                    ? "bg-neutral-light-100 dark:bg-neutral-dark-100"
                    : "bg-neutral-light-90 dark:bg-neutral-dark-90"
                )}
              >
                <div className="_flexbox__row__center__between w-full">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    {item.title}
                  </Typography>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.items.map((label, index) => (
                    <button
                      key={`button-label-${index}`}
                      type="button"
                      className={cn(
                        "w-fit text-nowrap rounded-md border border-transparent bg-neutral-light-100 px-4 py-3 dark:bg-neutral-dark-100",
                        "hover:bg-lime-lighter/20 disabled:cursor-not-allowed"
                      )}
                      disabled={isManualRisk}
                    >
                      <Typography
                        variant="p"
                        affects="small"
                        className="text-neutral-light-40 dark:text-neutral-dark-40"
                      >
                        {label.label}
                      </Typography>
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
export default CsvssCalculator;
