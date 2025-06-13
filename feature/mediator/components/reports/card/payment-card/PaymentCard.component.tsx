import { borderColor, textColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { Button, Card, Indicator, Typography } from "@/core/ui/components";
import { Currency } from "@/core/ui/icons";
import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { ModalReportDetails } from "../../_dialog/ModalReportDetails";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { PaymentDropdown } from "./PaymentDropdown";
import {
  useGetPaymentReceipt,
  usePostPaymentRequested,
} from "@/feature/company/query/client";
import { ModalSetReward } from "../../_dialog";
import { useToggle } from "usehooks-ts";

export const PaymentCard = ({
  data,
}: {
  data: I_GetChatListSuccessResponse["data"][0];
}) => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);
  const [showModalSetReward, toggleModalSetReward] = useToggle(false);
  const {
    mutateAsync: mutateGetPaymentReceipt,
    isPending: isPendingGetPaymentReceipt,
  } = useGetPaymentReceipt();

  const handleMakePayment = () => {
    toggleModalSetReward();
  };

  const handleDownloadReceipt = () => {
    mutateGetPaymentReceipt(
      data.ticket_type === "Hacker" ? data.id : (data.related_ticket_id ?? "")
    );
  };

  return (
    <>
      <Card
        className={cn(
          "flex w-full items-center justify-between border !bg-transparent !p-4",
          borderColor.mediator
        )}
      >
        <div className="grid grid-cols-[auto_1fr] gap-2">
          <div
            className={cn(
              "h-fit w-fit rounded-full border bg-violet-normal/10 p-2",
              textColor.mediator,
              borderColor.mediator
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
          {!!data.payment_error_message && (
            <div className="grid grid-cols-[auto_1fr] items-center gap-2">
              <Indicator variant="open" />
              <div className="flex flex-col gap-1">
                <Typography
                  variant="p"
                  affects="small"
                >
                  {t(`Ticket.payment_failed`)}
                </Typography>
                <Typography
                  variant="p"
                  affects="tiny"
                  className="italic"
                >
                  {data.payment_error_message}
                </Typography>
              </div>
            </div>
          )}
          <Button
            variant="primary-mediator"
            onClick={
              data.status.toLowerCase() === "waiting for payment"
                ? handleMakePayment
                : handleDownloadReceipt
            }
            disabled={isPendingGetPaymentReceipt}
          >
            {data.status.toLowerCase() === "waiting for payment"
              ? t("Ticket.send_payment_request")
              : t("Ticket.download_receipt")}
          </Button>
          <PaymentDropdown
            data={data}
            onClickRetryPayment={handleMakePayment}
            onClickViewDetails={() => setShowModal(true)}
          />
        </div>
      </Card>
      <ModalSetReward
        data={data}
        isOpen={showModalSetReward}
        onClose={toggleModalSetReward}
      />
      <ModalReportDetails
        data={data}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
