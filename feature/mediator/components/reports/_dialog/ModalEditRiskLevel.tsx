"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  badgeVariants,
  BaseModal,
  Button,
  Card,
  Checkbox,
  Typography,
} from "@/core/ui/components";
import { Slider } from "@/core/ui/components/slider/slider";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePostUpdateTicket } from "@/feature/mediator/query/client";
import { riskLevelCalculator } from "@/utils/risk-level-calculator";
import CsvssCalculator, {
  I_CsvssCalculatorProps,
} from "@/core/ui/components/csvss-calculator/csvss-calculator";
import { initialCvssValues } from "@/core/constants/progrmas/cvss";

interface I_ModalEditRiskLevelProps extends I_CsvssCalculatorProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  value: number;
  cvss: string | null;
}

const ModalEditRiskLevel = ({
  isOpen,
  onClose,
  ticketId,
  value: defaultValue,
  isManualRisk,
  cvss: cvss_string,
  onChangeManualRisk,
}: I_ModalEditRiskLevelProps) => {
  const [value, setValue] = useState<number>(defaultValue);
  const [cvss, setCvss] = useState<{ [key: string]: string }>(
    cvss_string ? JSON.parse(cvss_string) : initialCvssValues
  );
  const { mutateAsync, isPending, isSuccess } = usePostUpdateTicket(ticketId);

  const onCloseModal = () => {
    onClose();
    setValue(defaultValue);
    setCvss(cvss_string ? JSON.parse(cvss_string) : initialCvssValues);
  };

  const onChangeType = () => {
    onChangeManualRisk();
    setValue(0);
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onCloseModal}>
      <div
        className={cn(
          "mx-auto max-h-[80vh] w-full max-w-4xl overflow-auto rounded-xl px-8 py-12",
          "bg-background-main-light dark:bg-background-main-dark",
          "_flexbox__col__start__start gap-6"
        )}
      >
        <div className="_flexbox__row__center__start w-full gap-2.5">
          <Button
            variant="tertiary-mediator"
            className="p-0"
            prefixIcon={<X />}
            onClick={onCloseModal}
          />
          <Typography variant="h5" weight="bold">
            Update Risk Level
          </Typography>
        </div>
        <Card
          className={cn(
            "rounded-md bg-neutral-light-100 dark:bg-neutral-dark-100 xl:p-4.5",
            "_flexbox__col__start__start gap-8 transition-all duration-100"
          )}
        >
          <div className="_flexbox__col__start__start w-full gap-6">
            <Typography variant="h5" weight="bold">
              Risk Level
            </Typography>
            <Typography variant="p" affects="small">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget
              sit amet tellus. Morbi tristique senectus et netus et malesuada
              fames ac turpis.
            </Typography>
          </div>

          <CsvssCalculator
            value={value}
            isManualRisk={isManualRisk}
            onChangeManualRisk={onChangeType}
            onValueChange={(v, c) => {
              setValue(v);
              setCvss(c);
            }}
            cvss_string={cvss}
          />
          <Card
            className={cn(
              "rounded-md bg-neutral-light-90 dark:bg-neutral-dark-90 xl:px-4 xl:py-4.5",
              "_flexbox__col__start__start gap-4 transition-all duration-100"
            )}
          >
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__row__start__start gap-4">
                <Checkbox
                  variant="mediator"
                  checked={isManualRisk}
                  disabled={isManualRisk}
                  onCheckedChange={onChangeType}
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
                      value
                    ).toLowerCase() as keyof typeof badgeVariants
                  }
                >
                  {value.toFixed(1)} | {riskLevelCalculator(value)}
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
                          idx === value
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
                    value={[value]}
                    onValueChange={(v) => {
                      setValue(v[0] as number);
                    }}
                    max={10}
                    step={0.1}
                    className="col-span-11 w-full"
                  />
                </div>
              </motion.div>
            )}
          </Card>
          <Button
            variant="primary-mediator"
            className="w-full"
            disabled={isPending || isSuccess}
            isLoading={isPending}
            onClick={() => {
              mutateAsync(
                `risk_level=${value}${!isManualRisk ? `&cvss_string=${JSON.stringify(cvss)}` : `&cvss_string=`}`
              ).then(() => {
                onClose();
              });
            }}
          >
            Update Level
          </Button>
        </Card>
      </div>
    </BaseModal>
  );
};
export default ModalEditRiskLevel;
