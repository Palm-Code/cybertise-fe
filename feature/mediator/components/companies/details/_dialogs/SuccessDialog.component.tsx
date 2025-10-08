import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import BaseModal, { I_ModalProps } from "@/core/ui/components/modal/modal";
import { Users } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

interface SuccessDialogProps extends I_ModalProps {}

export const SuccessDialog = ({ ...props }: SuccessDialogProps = {}) => {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  return (
    <div className="grid h-full w-full content-center">
      <div
        className={cn(
          "mx-auto mt-auto w-full max-w-xl rounded-2xl px-10 py-20",
          "bg-background-main-light dark:bg-background-main-dark",
          "flex flex-col items-center justify-center gap-16"
        )}
      >
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="rounded-full border-[6px] border-neutral-light-0 p-4 dark:border-neutral-dark-0">
            <Users className="size-8 text-neutral-light-0 dark:text-neutral-dark-0" />
          </div>
          <Typography
            variant="h4"
            weight="bold"
            align="center"
          >
            {t("success_title")}
          </Typography>
          <Typography
            variant="p"
            affects="normal"
            align="center"
          >
            {t("success_description")}
          </Typography>
        </div>
        <Button
          variant="primary-mediator"
          fullWidth
          onClick={props.onClose}
        >
          {t("success_button")}
        </Button>
      </div>
    </div>
  );
};
