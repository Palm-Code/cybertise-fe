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
  onClickDownloadReceipt: () => void;
  onClickViewDetails: () => void;
};

export const PaymentDropdown = ({
  data,
  onClickDownloadReceipt,
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
        {data.payment_status === "paid" && (
          <DropdownMenuItem onClick={onClickDownloadReceipt}>
            {t("Ticket.download_receipt")}
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={onClickViewDetails}>
          {t("Ticket.view_details")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
