"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  badgeVariants,
  BaseModal,
  Button,
  Card,
  Typography,
} from "@/core/ui/components";
import { Slider } from "@/core/ui/components/slider/slider";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { usePostUpdateTicket } from "@/feature/mediator/query/client";
import { riskLevelCalculator } from "@/utils/risk-level-calculator";

interface I_ModalEditRiskLevelProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string;
  value: number;
}

const ModalEditRiskLevel = ({
  isOpen,
  onClose,
  ticketId,
  value: defaultValue,
}: I_ModalEditRiskLevelProps) => {
  const [value, setValue] = useState<number>(defaultValue);

  const { mutateAsync, isPending, isSuccess } = usePostUpdateTicket(ticketId);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          "mx-auto w-full max-w-4xl rounded-xl px-8 py-12",
          "bg-background-main-light dark:bg-background-main-dark",
          "_flexbox__col__start__start gap-6"
        )}
      >
        <div className="_flexbox__row__center__start w-full gap-2.5">
          <Button
            variant="tertiary-mediator"
            className="p-0"
            prefixIcon={<X />}
            onClick={onClose}
          />
          <Typography variant="h5" weight="bold">
            Update Risk Level
          </Typography>
        </div>
        <Card
          className={cn(
            "rounded-md bg-neutral-light-100 xl:p-4.5 dark:bg-neutral-dark-100",
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
          <Card
            className={cn(
              "rounded-md bg-neutral-light-90 xl:px-4 xl:py-4.5 dark:bg-neutral-dark-90",
              "_flexbox__col__start__start gap-4 transition-all duration-100"
            )}
          >
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__row__start__start gap-4">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Set Risk Level
                </Typography>
              </div>
              <Badge
                variant={
                  riskLevelCalculator(
                    value
                  ).toLowerCase() as keyof typeof badgeVariants
                }
              >
                {value} | {riskLevelCalculator(value)} Risk
              </Badge>
            </div>
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
                  onValueChange={(v) => setValue(v[0] as number)}
                  max={10}
                  step={1}
                  className="col-span-11 w-full"
                />
              </div>
            </motion.div>
          </Card>
          <Button
            variant="primary-mediator"
            className="w-full"
            disabled={value === 0 || isPending || isSuccess}
            isLoading={isPending}
            onClick={() => {
              mutateAsync(`risk_level=${value}`).then(() => {
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
