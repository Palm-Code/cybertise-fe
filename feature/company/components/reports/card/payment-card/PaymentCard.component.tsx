import { borderColor, textColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { Card, Indicator, Typography } from "@/core/ui/components";
import { Currency } from "@/core/ui/icons";
import { useTranslations } from "next-intl";
import React from "react";
import { ModalReportDetails } from "../../_dialog";
import { PaymentDropdown } from "./PaymentDropdown";
import { useBoolean } from "usehooks-ts";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";

export const PaymentCard = ({
  data,
}: {
  data: I_GetChatListSuccessResponse["data"][0];
}) => {
  const t = useTranslations();
  const {
    value: showModal,
    setTrue: setShowModalTrue,
    setFalse: setShowModalFalse,
  } = useBoolean(false);

  return (
    <>
      <Card
        className={cn(
          "flex w-full items-center justify-between border !bg-transparent !p-4",
          borderColor.company
        )}
      >
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <div
            className={cn(
              "h-fit w-fit rounded-full border bg-violet-normal/10 p-2",
              textColor.company,
              borderColor.company
            )}
          >
            <Currency className={cn("size-4")} />
          </div>
          <div className="flex flex-col gap-1">
            <Typography
              variant="p"
              affects="small"
              className="text-neutral-light-20 dark:text-neutral-dark-20"
            >
              {t("Ticket.rewards_payment")}
            </Typography>
            <Typography
              variant="p"
              affects="small"
            >
              {currencyFormatters.NumberToEUR(data.bounty ?? 0)}
            </Typography>
          </div>
        </div>
        <div className={cn("flex items-center gap-6")}>
          <div className="grid grid-cols-[auto_1fr] gap-2">
            <Indicator variant="open" />
            <div className="flex flex-col gap-1">
              <Typography
                variant="p"
                affects="small"
              >
                {t("Ticket.payment_failed")}
              </Typography>
              <Typography
                variant="p"
                affects="tiny"
                className="italic"
              >
                Insufficient balance
              </Typography>
            </div>
          </div>
          <PaymentDropdown
            onClickRetryPayment={() => {}}
            onClickViewDetails={setShowModalTrue}
          />
        </div>
      </Card>
      <ModalReportDetails
        data={data}
        isOpen={showModal}
        onClose={setShowModalFalse}
      />
    </>
  );
};
