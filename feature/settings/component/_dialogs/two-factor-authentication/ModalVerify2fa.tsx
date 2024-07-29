import { BaseModal, Button, Typography } from "@/core/ui/components";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { Role } from "@/types/admin/sidebar";
import { X } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { useState } from "react";
import { OTPInput } from "input-otp";

import { useGetVerifyTwoFactor } from "@/core/react-query/client/useGetVerifyTwoFactor";
import { Slot } from "./steps/InputOtp";

export interface I_ModalVerify2faProps extends I_ModalProps {
  variant?: keyof typeof Role;
  isLoading?: boolean;
}

const ModalVerify2fa = ({
  variant = "hacker",
  onClose = () => {},
  ...props
}: I_ModalVerify2faProps) => {
  const [otp, setOtp] = useState("");
  const {
    mutateAsync: mutateVerifyTwoFactor,
    isPending,
    isSuccess,
    isError,
  } = useGetVerifyTwoFactor();

  const onClickVerifyTwoFactor = async (otp: string) => {
    mutateVerifyTwoFactor(otp).then((res) => {
      if (res) {
        setOtp("");
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
          <Typography variant="h4" weight="semibold" align="center">
            Verify Your Authenticator
          </Typography>
          <Typography variant="p" affects="normal" align="center">
            Please enter authenticator code from your verified Two-Factor
            Authenticator app.
          </Typography>
        </div>
        <div className="_flexbox__col__start__start w-full gap-2">
          <OTPInput
            autoFocus
            maxLength={6}
            id={`otp-verify-2fa`}
            name={`otp-verify-2fa`}
            disabled={isPending || isSuccess}
            onComplete={() => onClickVerifyTwoFactor(otp)}
            value={otp}
            onChange={setOtp}
            containerClassName="group w-full flex items-center has-[:disabled]:opacity-30"
            render={({ slots }) => (
              <>
                <div className="_flexbox__row__center w-full gap-1.5">
                  {slots.map((slot, idx) => (
                    <Slot isError={isError} key={`slot-${idx}`} {...slot} />
                  ))}
                </div>
              </>
            )}
          />
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalVerify2fa;
