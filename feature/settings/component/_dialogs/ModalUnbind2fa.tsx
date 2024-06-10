import {
  BaseModal,
  Button,
  PasswordInput,
  Typography,
} from "@/core/ui/components";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { Role } from "@/types/admin/sidebar";
import { useState } from "react";
import { useGetDisableTwoFactor } from "@/core/react-query/client/useGetDisableTwoFactor";
import { KeyRound, X } from "lucide-react";
import Link from "next/link";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { cn } from "@/core/lib/utils";

export interface I_ModalUnbind2faProps extends I_ModalProps {
  variant?: keyof typeof Role;
  isLoading?: boolean;
}

const ModalUnbind2fa = ({
  variant = "hacker",
  onClose = () => {},
  ...props
}: I_ModalUnbind2faProps) => {
  const [password, setPassword] = useState("");
  const { mutateAsync: mutateDisableTwoFactor, isPending } =
    useGetDisableTwoFactor();

  const onClickVerifyDisableTwoFactor = async (password: string) => {
    mutateDisableTwoFactor(password).then((res) => {
      if (res) {
        onClose();
      }
    });
  };

  return (
    <BaseModal
      {...props}
      className="bg-background-page-light/90 backdrop-blur-sm dark:bg-background-page-dark/90"
    >
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
            onClick={onClose}
            className="mr-auto p-0"
          >
            Cancel
          </Button>
          <KeyRound className="h-16 w-16" />
          <Typography variant="h4" weight="semibold">
            Unbind Authenticator
          </Typography>
          <Typography variant="p" affects="normal" align="center">
            Please enter authenticator code from your verified Two-Factor
            Authenticator app.
          </Typography>
        </div>
        <div className="_flexbox__col__start__start w-full gap-2">
          <PasswordInput
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
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
            Forgot Password ?
          </Link>
        </div>
        <Button
          disabled={password.length === 0 || isPending}
          isLoading={isPending}
          variant={`primary-${variant}`}
          fullWidth
          onClick={() => onClickVerifyDisableTwoFactor(password)}
        >
          Verify
        </Button>
      </div>
    </BaseModal>
  );
};
export default ModalUnbind2fa;
