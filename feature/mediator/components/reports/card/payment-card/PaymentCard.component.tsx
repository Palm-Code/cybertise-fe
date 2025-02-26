import { borderColor, textColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { Button, Card } from "@/core/ui/components";
import { Currency } from "@/core/ui/icons";
import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { ModalReportDetails } from "../../_dialog/ModalReportDetails";
import { ModalSetReward } from "../../_dialog/ModalSetReward";
import { useBoolean } from "usehooks-ts";

export const PaymentCard = ({
  data,
}: {
  data: I_GetChatListSuccessResponse["data"][0];
}) => {
  const t = useTranslations();
  const [showModal, setShowModal] = useState(false);
  const { value: showModalSetReward, toggle: toggleModalSetReward } =
    useBoolean();
  return (
    <>
      <Card
        className={cn(
          "flex w-full items-center justify-between border !bg-transparent !p-4",
          borderColor.mediator
        )}
      >
        <div
          className={cn(
            "h-fit w-fit rounded-full border bg-violet-normal/10 p-2",
            textColor.mediator,
            borderColor.mediator
          )}
        >
          <Currency className={cn("size-4")} />
        </div>
        <div className={cn("flex items-center gap-6")}>
          <Button
            variant="tertiary-mediator"
            onClick={() => setShowModal(true)}
          >
            {t("Payment.more_info")}
          </Button>
          <Button
            disabled={data.bounty}
            variant="primary-mediator"
            onClick={toggleModalSetReward}
          >
            {data.bounty
              ? t("Ticket.payment_request_sent")
              : t("Ticket.set_reward")}
          </Button>
          <Button
            size="icon"
            variant="tertiary-mediator"
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
      <ModalSetReward
        data={data}
        isOpen={showModalSetReward}
        onClose={toggleModalSetReward}
      />
    </>
  );
};
