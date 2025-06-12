import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/core/ui/components";
import { Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type PaymentDropdownProps = {
  data: I_GetChatListSuccessResponse["data"][0];
  onClickRetryPayment: () => void;
  onClickViewDetails: () => void;
};

export const PaymentDropdown = ({
  data,
  onClickRetryPayment,
  onClickViewDetails,
}: PaymentDropdownProps) => {
  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="tertiary-mediator"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-20}
        sideOffset={10}
      >
        {!!data.payment_error_message && (
          <DropdownMenuItem onClick={onClickRetryPayment}>
            {t("Ticket.retry_payment")}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onClickViewDetails}>
          {t("Payment.more_info")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
