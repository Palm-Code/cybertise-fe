import { BaseModal } from "@/core/ui/components";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { Role } from "@/types/admin/sidebar";
import { useGetEnableTwoFactor } from "@/core/react-query/client/useGetEnableTwoFactor";
import { useState } from "react";
import { useGetConfirmTwoFactor } from "@/core/react-query/client/useGetConfirmTwoFactor";
import QrCode from "./steps/QrCode";
import InputPassword from "./steps/InputPassword";
import InputOtp from "./steps/InputOtp";

export interface I_ModalEdit2faProps extends I_ModalProps {
  variant?: keyof typeof Role;
  isLoading?: boolean;
}

const ModalEdit2fa = ({
  variant = "hacker",
  onClose = () => {},
  ...props
}: I_ModalEdit2faProps) => {
  const {
    mutateAsync: mutateConfirmTwoFactor,
    isPending: isPendingConfirm,
    isError,
  } = useGetConfirmTwoFactor();
  const {
    mutateAsync: mutateEnableTwoFactor,
    isPending,
    error,
  } = useGetEnableTwoFactor();
  const [enableTwoFactorData, setEnableTwoFactorData] = useState<{
    qr: string;
    secret: string;
  } | null>(null);
  const [activeState, setActiveState] = useState<string>("input-old-otp");

  const onClickVerifyEnableTwoFactor = async (password: string) => {
    await mutateEnableTwoFactor({ password: password }).then((res) => {
      if (res) {
        const encodedSvg = encodeURIComponent(res.data.qr)
          .replace(/'/g, "%27")
          .replace(/"/g, "%22");

        // Create a data URI
        const svgDataUri = `data:image/svg+xml;charset=UTF-8,${encodedSvg}`;
        setEnableTwoFactorData({ qr: svgDataUri, secret: res.data.secret });
        setActiveState("qr-code");
      }
    });
  };
  const onClickActivateTwoFactor = (otp: string) => {
    mutateConfirmTwoFactor({ code: otp }).then((res) => {
      if (res) {
        onClose();
      }
    });
  };

  const state: {
    [key: string]: JSX.Element;
  } = {
    "input-old-otp": (
      <InputPassword
        error={error?.message}
        onClose={onClose}
        variant={variant}
        isLoading={isPending}
        onClickVerify={onClickVerifyEnableTwoFactor}
      />
    ),
    "qr-code": (
      <QrCode
        onClose={onClose}
        data={enableTwoFactorData}
        variant={variant}
        onClickAuthenticate={() => setActiveState("input-otp")}
      />
    ),
    "input-otp": (
      <InputOtp
        isError={isError}
        isLoading={isPendingConfirm}
        onClose={onClose}
        variant={variant}
        onClickActivate={onClickActivateTwoFactor}
      />
    ),
  };

  return (
    <BaseModal
      {...props}
      className="bg-background-page-light/90 backdrop-blur-sm dark:bg-background-page-dark/90"
    >
      {state[activeState]}
    </BaseModal>
  );
};
export default ModalEdit2fa;
