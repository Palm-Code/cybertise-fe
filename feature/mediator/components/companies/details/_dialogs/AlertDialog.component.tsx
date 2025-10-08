import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import BaseModal, { I_ModalProps } from "@/core/ui/components/modal/modal";
import { XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface AlertDialogProps extends I_ModalProps {
  onClickKeep?: () => void;
}

export const AlertDialog = ({ onClickKeep, ...props }: AlertDialogProps) => {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  return (
    <BaseModal {...props}>
      <div
        className={cn(
          "bg-background-main-light dark:bg-background-main-dark",
          "mx-auto flex max-w-fit flex-col gap-12 rounded-2xl px-10 py-20"
        )}
      >
        <XCircle className="h-16 w-16 text-semantic-light-critical dark:text-semantic-dark-critical" />
        <div className="flex flex-col gap-6">
          <Typography
            variant="h4"
            weight="bold"
          >
            {t("alert_title")}
          </Typography>
          <Typography
            variant="p"
            affects="normal"
          >
            {t("alert_description")}
          </Typography>
        </div>
        <div className="flex w-full items-center gap-6">
          <Button
            variant="secondary-mediator"
            fullWidth
            onClick={onClickKeep}
          >
            {t("button_keep_it")}
          </Button>
          <Button
            variant="primary-mediator"
            fullWidth
            onClick={props.onClose}
          >
            {t("button_yes_cancel_report")}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
