import React from "react";
import BaseModal, { I_ModalProps } from "../modal/modal";
import { TriangleAlert, X } from "lucide-react";
import Typography from "../typography/typography";
import { cn } from "@/core/lib/utils";
import { useTranslations } from "next-intl";

interface I_PasswordModalAlertProps extends I_ModalProps {}

export const PasswordModalAlert = ({ ...props }: I_PasswordModalAlertProps) => {
  const t = useTranslations("PasswordInput.password_alert");
  return (
    <BaseModal
      {...props}
      className="bg-background-page-light/90 backdrop-blur-sm dark:bg-background-page-dark/90"
    >
      <div
        className={cn(
          "_flexbox__col__start__start mx-auto w-full max-w-lg",
          "gap-6 rounded-lg p-6 xl:p-10",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div
          className="grid cursor-pointer grid-cols-[auto_1fr] items-center gap-2"
          onClick={props.onClose}
        >
          <X className="size-6" />
          <Typography
            variant="p"
            affects="normal"
          >
            {t("button_close")}
          </Typography>
        </div>
        <div className="grid grid-cols-[auto_1fr] items-center gap-6">
          <TriangleAlert className="size-6 text-warning" />
          <Typography
            variant="h5"
            weight="bold"
          >
            {t("title")}
          </Typography>
        </div>
        <div className="_flexbox__col__start__start w-full gap-2.5">
          <Typography
            variant="p"
            affects="normal"
          >
            {t("description")}
          </Typography>
          <div className="w-full rounded-[10px] bg-background-page-light p-2 dark:bg-background-page-dark xl:p-4">
            <Typography
              variant="p"
              affects="small"
              weight="semibold"
            >
              {t("suggestion")}
            </Typography>
            <ul className="list-inside list-disc text-sm *:text-white">
              <li>{t("list_1")}</li>
              <li>{t("list_2")}</li>
            </ul>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
