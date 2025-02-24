import { cn } from "@/core/lib/utils";
import { BaseModal, Button, Typography } from "@/core/ui/components";
import { buttonVariants } from "@/core/ui/components/button/base-button";
import { CheckCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

interface I_ModalSuccessSubmitProps {
  isOpen: boolean;
}

const ModalSuccessSubmit = ({ isOpen }: I_ModalSuccessSubmitProps) => {
  const t = useTranslations("SuccesState.send_report");
  return (
    <BaseModal isOpen={isOpen}>
      <div
        className={cn(
          "relative mx-auto w-fit max-w-screen-md rounded-lg p-20",
          "_flexbox__col__start__start gap-12",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__center w-full gap-6">
          <CheckCircle className="h-16 w-16 text-semantic-light-success dark:text-semantic-dark-success" />
          <Typography
            variant="h5"
            weight="bold"
          >
            {t("title")}
          </Typography>
          <Typography
            variant="p"
            affects="normal"
            className="mt-2"
            align="center"
          >
            {t("description")}
          </Typography>
        </div>
        <div className="mx-auto flex w-full flex-wrap items-center justify-center gap-6">
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "secondary-hacker",
            })}
          >
            {t("button_back")}
          </Link>
          <Link
            href="/reports"
            className={buttonVariants({
              variant: "primary-hacker",
            })}
          >
            {t("button_reports")}
          </Link>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalSuccessSubmit;
