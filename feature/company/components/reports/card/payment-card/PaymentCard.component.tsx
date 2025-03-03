import { borderColor, textColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { Button, Card } from "@/core/ui/components";
import { Currency } from "@/core/ui/icons";
import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { ModalReportDetails } from "../../_dialog";

export const PaymentCard = ({
  data,
}: {
  data: I_GetChatListSuccessResponse["data"][0];
}) => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Card
        className={cn(
          "flex w-full items-center justify-between border !bg-transparent !p-4",
          borderColor.company
        )}
      >
        <div
          className={cn(
            "h-fit w-fit rounded-full border bg-violet-normal/10 p-2",
            textColor.company,
            borderColor.company
          )}
        >
          <Currency className={cn("size-4")} />
        </div>
        <div className={cn("flex items-center gap-6")}>
          <Button
            variant="tertiary-company"
            onClick={() => setShowModal(true)}
          >
            {t("Payment.more_info")}
          </Button>
          <Button
            disabled={data.status.toLowerCase() !== "waiting for payment"}
            variant="primary-company"
          >
            {data.status.toLowerCase() === "waiting for payment"
              ? t("Ticket.make_payment")
              : t("Ticket.download_receipt")}
          </Button>
          <Button
            size="icon"
            variant="tertiary-company"
            title={t("Ticket.help")}
          >
            <Ellipsis />
          </Button>
        </div>
      </Card>
      <ModalReportDetails
        data={data}
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      />
    </>
  );
};
