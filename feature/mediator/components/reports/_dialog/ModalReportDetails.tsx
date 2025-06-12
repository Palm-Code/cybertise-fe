import { cn } from "@/core/lib/utils";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import {
  Badge,
  BaseModal,
  Button,
  Indicator,
  Typography,
} from "@/core/ui/components";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface ModalReportDetailsProps extends I_ModalProps {
  data: I_GetChatListSuccessResponse["data"][0];
}

export const ModalReportDetails = ({
  data,
  ...props
}: ModalReportDetailsProps) => {
  const t = useTranslations();
  return (
    <BaseModal {...props}>
      <div
        className={cn(
          "mx-auto w-full max-w-2xl rounded-lg",
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
          {t("Ticket.ticket_details")}
        </Typography>
        <div
          className={cn(
            "w-full rounded-md bg-neutral-light-90 dark:bg-neutral-dark-90",
            "p-6"
          )}
        >
          <div className={cn("flex w-full flex-col gap-8")}>
            <div className={cn("flex w-full flex-col gap-2")}>
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
            <div
              className={cn(
                "grid w-full grid-cols-3 content-between items-center",
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
                  variant={data.status.toLowerCase() as keyof typeof Indicator}
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
                  {currencyFormatters.NumberToEUR(data?.bounty ?? 0)}
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
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
