import { cn } from "@/core/lib/utils";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { Badge, Card, Checkbox, Typography } from "@/core/ui/components";
import {
  AttackComplexity,
  AttackVector,
  Availability,
  Confidentiality,
  Integrity,
  PrivilegesRequired,
  Scope,
  UserInteraction,
} from "@/enums";
import { csvss_calculator } from "@/feature/hacker/constants/programs";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { CVSS30 } from "@pandatix/js-cvss";
import { riskLevelCalculator } from "@/utils/risk-level-calculator";
import { useTranslations } from "next-intl";

export interface I_CsvssCalculatorProps {
  isManualRisk: boolean;
  onChangeManualRisk: () => void;
}

const initialValues = {
  av: AttackVector.NETWORK,
  ac: AttackComplexity.LOW,
  pr: PrivilegesRequired.NONE,
  ui: UserInteraction.NONE,
  s: Scope.UNCHANGED,
  c: Confidentiality.NONE,
  i: Integrity.NONE,
  a: Availability.NONE,
};

const CsvssCalculator = ({
  isManualRisk,
  onChangeManualRisk,
}: I_CsvssCalculatorProps) => {
  const t = useTranslations("SendReportHacker.bug_target");
  const { setValue, getValues } = useFormContext<SendReportRequestType>();
  const forms = getValues();
  const [metricsValue, setMetricsValue] = useState<{ [key: string]: string }>(
    forms.cvss_string ? JSON.parse(forms.cvss_string) : initialValues
  );

  const onClickCsvssCalculator = (key: string, value: string) => {
    const newValue = { ...metricsValue, [key]: value };
    const metValue = new CVSS30(
      `CVSS:3.0/AV:${newValue.av}/AC:${newValue.ac}/PR:${newValue.pr}/UI:${newValue.ui}/S:${newValue.s}/C:${newValue.c}/I:${newValue.i}/A:${newValue.a}`
    );
    setMetricsValue(newValue);
    setValue("cvss_string", JSON.stringify(newValue), { shouldValidate: true });
    setValue("risk_level", metValue.BaseScore(), { shouldValidate: true });
  };

  return (
    <Card
      className={cn(
        "rounded-md transition-all duration-100 xl:px-4 xl:py-4.5",
        !isManualRisk
          ? "bg-neutral-light-80 dark:bg-neutral-dark-80"
          : "bg-neutral-light-90 dark:bg-neutral-dark-90"
      )}
    >
      <div className="_flexbox__col__center__start w-full gap-4">
        <div className="_flexbox__row__center__between w-full">
          <div className="_flexbox__row__center gap-4">
            <Checkbox
              variant="hacker"
              checked={!isManualRisk}
              disabled={!isManualRisk}
              onCheckedChange={() => {
                setValue("risk_level", 0, { shouldValidate: true });
                setMetricsValue(initialValues);
                onChangeManualRisk();
              }}
            />
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("label_cvss_calculator")}
            </Typography>
          </div>
          {!isManualRisk && (
            <Badge variant={riskLevelCalculator(forms.risk_level)}>
              {forms.risk_level.toFixed(1)} (
              {riskLevelCalculator(forms.risk_level)})
            </Badge>
          )}
        </div>
        {!isManualRisk && (
          <div className="relative grid h-fit w-full grid-cols-2 gap-4">
            {csvss_calculator.map((item, idx) => (
              <Card
                key={`card-csvss-${idx}`}
                className={cn(
                  "_flexbox__col__start__start gap-4 rounded-md xl:px-4 xl:py-4.5",
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
                  {item.items.map((label, index) => {
                    return (
                      <button
                        key={`button-label-${index}`}
                        type="button"
                        className={cn(
                          "w-fit whitespace-nowrap rounded-md border border-transparent  px-4 py-3",
                          "hover:bg-lime-lighter-light/20 disabled:cursor-not-allowed dark:hover:bg-lime-lighter-dark/20",
                          "hover:border-lime-normal-light dark:hover:border-lime-normal-dark",
                          label.value === metricsValue[item.key]
                            ? "border-lime-normal-light bg-lime-lighter-light/20 dark:border-lime-normal-dark dark:bg-lime-lighter-dark/20"
                            : "border border-transparent bg-neutral-light-100 dark:border-transparent dark:bg-neutral-dark-100"
                        )}
                        onClick={() => {
                          onClickCsvssCalculator(item.key, label.value);
                        }}
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
                    );
                  })}
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
