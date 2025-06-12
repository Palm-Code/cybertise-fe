"use client";
import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import {
  Badge,
  BaseModal,
  Button,
  Checkbox,
  Indicator,
  Input,
  Separator,
  TextArea,
  Typography,
} from "@/core/ui/components";
import CustomNumberFormat from "@/core/ui/components/input/price-format-input";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { usePostPaymentRequested } from "@/feature/company/query/client";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useBoolean } from "usehooks-ts";

interface ModalSetRewardProps extends I_ModalProps {
  data: I_GetChatListSuccessResponse["data"][0];
}

export const ModalSetReward = ({ data, ...props }: ModalSetRewardProps) => {
  const t = useTranslations();
  const {
    value: error,
    setTrue: setErrorTrue,
    setFalse: setErrorFalse,
  } = useBoolean(false);
  const [reward, setReward] = useState<number | null>(null);
  const [reason, setReason] = useState<string | undefined>();
  const {
    value: confirm,
    setTrue: setConfirmTrue,
    setFalse: setConfirmFalse,
  } = useBoolean(false);
  const { value: changeBounty, toggle: toggleChangeBounty } = useBoolean(false);
  const { value: collapse, toggle: toggleCollapse } = useBoolean(false);
  const {
    mutateAsync: mutatePostPaymentRequested,
    isPending: isPendingPostPaymentRequested,
  } = usePostPaymentRequested();

  const handleSetReward = () => {
    mutatePostPaymentRequested({
      id:
        data.ticket_type === "Hacker"
          ? data.id
          : (data.related_ticket_id ?? ""),
      payload: {
        bounty: reward ?? undefined,
        override_reason: reason ?? undefined,
      },
    }).then(() => {
      props.onClose?.();
    });
  };
  return (
    <BaseModal {...props}>
      <div
        className={cn(
          "mx-auto max-h-[795px] w-full max-w-2xl overflow-auto rounded-lg",
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
        <div className={cn("flex w-full flex-col gap-10", "items-center")}>
          <div
            className={cn(
              "w-full rounded-md bg-neutral-light-90 dark:bg-neutral-dark-90",
              "p-6"
            )}
          >
            <div className={cn("flex w-full flex-col")}>
              <div className="grid w-full grid-cols-[1fr_auto] gap-4">
                <div className={cn("!line-clamp-1 flex flex-col gap-2")}>
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
              <AnimatePresence>
                {collapse && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, margin: "0px" }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                      margin: "32px 0px",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                      margin: "0px",
                      transition: {
                        height: { duration: 0.3, delay: 0.15 },
                        margin: { duration: 0.3, delay: 0.15 },
                        opacity: { duration: 0.2 },
                      },
                    }}
                    transition={{ duration: 0.3, opacity: { delay: 0.15 } }}
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
                          : `${currencyFormatters.NumberToEUR(data?.program?.monetary_awards_low ?? 0)} - ${currencyFormatters.NumberToEUR(data?.program?.monetary_awards_critical ?? 0)}`}
                      </Typography>
                    </div>
                    {data.override_reason && (
                      <div className={cn("flex w-fit flex-col gap-2")}>
                        <Typography
                          variant="p"
                          affects="small"
                        >
                          {t("Ticket.reason")}
                        </Typography>
                        <Typography
                          variant="p"
                          affects="small"
                        >
                          {data.override_reason}
                        </Typography>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                variant="ghost-mediator"
                onClick={toggleCollapse}
                size="icon"
              >
                {collapse ? t("Ticket.show_less") : t("Ticket.show_more")}
              </Button>
            </div>
          </div>
          <div
            className={cn(
              "mr-auto grid grid-cols-[auto_1fr] items-center gap-2"
            )}
          >
            <Checkbox
              variant="mediator"
              checked={changeBounty}
              onCheckedChange={toggleChangeBounty}
            />
            <Typography
              variant="p"
              affects="small"
            >
              {t("Ticket.change_bounty_rewards")}
            </Typography>
          </div>
          {confirm ? (
            <div className={cn("flex w-full flex-col gap-16")}>
              <div className={cn("flex w-full flex-col gap-4")}>
                <Typography
                  variant="p"
                  affects="normal"
                >
                  {t("Ticket.note")}
                </Typography>
                <Typography
                  variant="p"
                  affects="small"
                >
                  {t("Ticket.confirm_reward_description")}
                </Typography>
              </div>
              <div className={cn("flex w-full flex-col gap-6")}>
                <Button
                  disabled={isPendingPostPaymentRequested}
                  variant="secondary-mediator"
                  onClick={() => setConfirmFalse()}
                  fullWidth
                >
                  {t("Ticket.edit_reward")}
                </Button>
                <Button
                  variant="primary-mediator"
                  fullWidth
                  disabled={isPendingPostPaymentRequested}
                  isLoading={isPendingPostPaymentRequested}
                  onClick={handleSetReward}
                >
                  {t("Ticket.set_reward_and_make_payment")}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div
                className={cn("mx-auto flex w-full max-w-56 flex-col gap-4")}
              >
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
                      }).format(Number(numStr));
                    }}
                    disabled={!changeBounty}
                    value={data.bounty ?? reward}
                    onValueChange={(v) => {
                      if (
                        Number(v.value) <
                          (data?.program?.monetary_awards_low ?? 0) ||
                        Number(v.value) >
                          (data?.program?.monetary_awards_critical ?? 0)
                      ) {
                        setErrorTrue();
                        return;
                      }
                      setErrorFalse();
                      setReward(Number(v.value));
                    }}
                    className="h-full w-full bg-transparent text-[56px] font-bold focus:outline-none"
                  />
                </div>
                {changeBounty && (
                  <Separator className={cn(error && "!bg-red-error")} />
                )}
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
                    data?.program?.monetary_awards_critical ?? 0
                  )}
                </Typography>
              </div>
              {changeBounty && (
                <TextArea
                  label={t("Ticket.reason")}
                  description={`${t("TextEditor.remaining_characters")}: ${5000 - (reason?.length ?? 0)} / 5000`}
                  maxLength={5000}
                  value={reason ?? ""}
                  onChange={(e) => {
                    if (e.target.value.length <= 5000) {
                      setReason(e.target.value);
                    }
                  }}
                />
              )}
              <Button
                variant="primary-mediator"
                fullWidth
                onClick={() => {
                  setConfirmTrue();
                }}
                disabled={(changeBounty && !reason) || error}
              >
                {t("Ticket.set_reward_and_make_payment")}
              </Button>
            </>
          )}
        </div>
      </div>
    </BaseModal>
  );
};
