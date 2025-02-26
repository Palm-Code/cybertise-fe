import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import {
  Badge,
  BaseModal,
  Button,
  Indicator,
  Separator,
  Typography,
} from "@/core/ui/components";
import CustomNumberFormat from "@/core/ui/components/input/price-format-input";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

interface ModalSetRewardProps extends I_ModalProps {
  data: I_GetChatListSuccessResponse["data"][0];
}

export const ModalSetReward = ({ data, ...props }: ModalSetRewardProps) => {
  const t = useTranslations();
  const [reward, setReward] = useState(data?.bounty ?? 0);
  return (
    <BaseModal {...props}>
      <div
        className={cn(
          "mx-auto aspect-square w-full max-w-2xl overflow-auto rounded-lg",
          "bg-background-main-light dark:bg-background-main-dark",
          "flex flex-col gap-6 px-6 py-4 pb-10"
        )}
      >
        <Button
          variant="tertiary-mediator"
          prefixIcon={<X />}
          size="icon"
          onClick={props.onClose}
        >
          {t("Common.button_cancel")}
        </Button>
        <Typography
          variant="h4"
          weight="bold"
          align="center"
        >
          {t("Ticket.set_reward")}
        </Typography>
        <div className={cn("flex w-full flex-col gap-16", "items-center")}>
          <div
            className={cn(
              "w-full rounded-md bg-neutral-light-90 dark:bg-neutral-dark-90",
              "p-6"
            )}
          >
            <div className={cn("flex w-full flex-col gap-8")}>
              <div className="flex w-full items-center justify-between">
                <div className={cn("flex flex-col gap-2")}>
                  {`#${data.code} - ${data.title}`}
                </div>
                <div className={cn("flex items-center gap-4")}>
                  <Badge variant="other">{data.program?.type}</Badge>
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                  >
                    {t("Ticket.last_reported", {
                      date: formatDateToAgo(data?.created_at ?? ""),
                    })}
                  </Typography>
                </div>
              </div>
              <div
                className={cn(
                  "flex flex-wrap items-center justify-between gap-40",
                  "gap-6"
                )}
              >
                <div className={cn("flex flex-col gap-2")}>
                  <Typography
                    variant="p"
                    affects="small"
                  >
                    {t("Ticket.vulnerability_type")}
                  </Typography>
                  <Typography
                    variant="p"
                    affects="small"
                  >
                    {data?.vulnerabiity_type?.label}
                  </Typography>
                </div>
                <div className={cn("flex w-fit flex-col gap-2")}>
                  <Typography
                    variant="p"
                    affects="small"
                  >
                    {t("Ticket.risk_level")}
                  </Typography>
                  <Badge
                    variant={
                      data.risk_level_category.toLowerCase() as keyof typeof Badge
                    }
                  >
                    {data?.risk_level_category}
                  </Badge>
                </div>
                <div className={cn("flex w-fit flex-col gap-2")}>
                  <Typography
                    variant="p"
                    affects="small"
                  >
                    {t("Ticket.status")}
                  </Typography>
                  <Indicator
                    variant={
                      data.status.toLowerCase() as keyof typeof Indicator
                    }
                  >
                    {data?.status}
                  </Indicator>
                </div>
                <div className={cn("flex w-fit flex-col gap-2")}>
                  <Typography
                    variant="p"
                    affects="small"
                  >
                    {t("Ticket.rewards")}
                  </Typography>
                  <Typography
                    variant="p"
                    affects="small"
                  >
                    {data.bounty
                      ? currencyFormatters.NumberToEUR(data?.bounty ?? 0)
                      : `${currencyFormatters.NumberToEUR(data?.program?.monetary_awards_low ?? 0)} - ${currencyFormatters.NumberToEUR(data?.program?.monetary_awards_high ?? 0)}`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
          <div className={cn("mx-auto flex w-full max-w-56 flex-col gap-4")}>
            <div className={cn("grid w-full grid-cols-[auto_1fr] gap-2")}>
              <Typography
                variant="h1"
                weight="bold"
              >
                €
              </Typography>
              <CustomNumberFormat
                format={(numStr: string) => {
                  return new Intl.NumberFormat("de-DE", {
                    style: "decimal",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(Number(numStr));
                }}
                value={reward}
                onValueChange={(v) => {
                  setReward(v.value);
                }}
                className="h-full w-full bg-transparent text-[56px] font-bold focus:outline-none"
              />
            </div>
            <Separator />
            <Typography
              variant="p"
              affects="small"
              className="italic"
            >
              {t("Ticket.reward_range")}{" "}
              {currencyFormatters.NumberToEUR(
                data?.program?.monetary_awards_low ?? 0
              )}{" "}
              -{" "}
              {currencyFormatters.NumberToEUR(
                data?.program?.monetary_awards_high ?? 0
              )}
            </Typography>
          </div>
          <Button
            variant="primary-mediator"
            fullWidth
          >
            {t("Ticket.set_reward_and_request_payment")}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
