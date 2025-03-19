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
  onClickRetryPayment: () => void;
  onClickViewDetails: () => void;
};

export const PaymentDropdown = ({
  onClickRetryPayment,
  onClickViewDetails,
}: PaymentDropdownProps) => {
  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="tertiary-company"
        >
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onClickRetryPayment}>
          {t("Ticket.retry_payment")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClickViewDetails}>
          {t("Ticket.view_details")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
