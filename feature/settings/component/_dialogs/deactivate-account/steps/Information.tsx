import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import { OctagonX, X } from "lucide-react";
import { I_ModalSetup2faProps } from "../../two-factor-authentication/ModalSetup2fa";
import { useTranslations } from "next-intl";

const Information = ({
  variant = "hacker",
  isLoading = false,
  error = "",
  onClickVerify = () => {},
  ...props
}: I_ModalSetup2faProps & {
  onClickVerify?: (password: string) => void;
  error?: string;
}) => {
  const t = useTranslations(
    "Settings.data_privacy.deactivate_account.information"
  );
  return (
    <div
      className={cn(
        "_flexbox__col__center mx-auto w-full max-w-xl gap-16 rounded-lg",
        "bg-background-main-light p-10 dark:bg-background-main-dark"
      )}
    >
      <div className="_flexbox__col__center w-full gap-6">
        <Button
          variant={`tertiary-${variant}`}
          prefixIcon={<X />}
          onClick={props.onClose}
          className="mr-auto p-0"
        >
          {t("button_cancel")}
        </Button>
        <OctagonX className="mx-auto h-16 w-16" />
        <Typography
          variant="h4"
          weight="semibold"
          align="center"
        >
          {t("title")}
        </Typography>
        <Typography
          variant="p"
          affects="normal"
          align="center"
          className="text-neutral-light-50 dark:text-neutral-dark-50"
        >
          {t("description")}
        </Typography>
        <Typography
          variant="h5"
          weight="semibold"
          align="left"
          className="mr-auto"
        >
          {t("additional_information.title")}
        </Typography>
        <ul className="flex list-inside list-disc flex-col gap-4 text-start text-neutral-light-50 dark:text-neutral-dark-50">
          <li>{t("additional_information.information_1")}</li>
          <li>{t("additional_information.information_2")}</li>
        </ul>
      </div>
      <Button
        isLoading={isLoading}
        variant="alert"
        fullWidth
        onClick={() => onClickVerify("confirmation")}
      >
        {t("button_deactivate")}
      </Button>
    </div>
  );
};
export default Information;
