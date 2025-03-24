import { cn } from "@/core/lib/utils";
import { Button, PasswordInput, Typography } from "@/core/ui/components";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { KeyRound, X } from "lucide-react";
import Link from "next/link";
import { I_ModalSetup2faProps } from "../ModalSetup2fa";
import { useState } from "react";
import { useTranslations } from "next-intl";

const InputPassword = ({
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
    "Settings.security.two_factor_authentication.setup_2fa"
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
        <KeyRound className="h-16 w-16" />
        <Typography
          variant="h4"
          weight="semibold"
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
          placeholderText={t("label_password")}
          isError={!!error}
          errorMsg={error}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onClickVerify(password)}
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
        disabled={password.length === 0 || isLoading}
        isLoading={isLoading}
        variant={`primary-${variant}`}
        fullWidth
        onClick={() => onClickVerify(password)}
      >
        {t("button_verify")}
      </Button>
    </div>
  );
};
export default InputPassword;
