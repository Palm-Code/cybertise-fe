import { cn } from "@/core/lib/utils";
import { Button, PasswordInput, Typography } from "@/core/ui/components";
import { OctagonX, X } from "lucide-react";
import { I_ModalSetup2faProps } from "../../two-factor-authentication/ModalSetup2fa";
import { useState } from "react";
import Link from "next/link";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { useTranslations } from "next-intl";

const Confirmation = ({
  variant = "hacker",
  isLoading = false,
  disabled = false,
  error = "",
  onClickVerify = () => {},
  ...props
}: I_ModalSetup2faProps & {
  onClickVerify?: (password: string) => void;
  error?: string;
  disabled?: boolean;
}) => {
  const t = useTranslations(
    "Settings.data_privacy.deactivate_account.confirmation"
  );
  const [password, setPassword] = useState("");
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
      </div>
      <div className="_flexbox__col__start__start w-full gap-2">
        <PasswordInput
          label={t("label_password")}
          placeholderText={t("placeholder_password")}
          isError={!!error}
          errorMsg={error}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link
          href="/forgot-password"
          className={cn(
            typographyVariants({
              variant: "p",
              affects: "normal",
              weight: "semibold",
            })
          )}
        >
          {t("forgot_password")}
        </Link>
      </div>
      <Button
        isLoading={isLoading}
        disabled={!password || disabled}
        variant="alert"
        fullWidth
        onClick={() => onClickVerify(password)}
        className="bg-semantic-light-critical text-white dark:bg-semantic-dark-critical dark:text-white"
      >
        {t("button_deactivate")}
      </Button>
    </div>
  );
};
export default Confirmation;
