import { BaseModal } from "@/core/ui/components";
import { I_ModalProps } from "@/core/ui/components/modal/modal";
import { Role } from "@/types/admin/sidebar";
import { useState } from "react";
import Confirmation from "./steps/Confirmation";
import Information from "./steps/Information";
import Success from "./steps/Success";
import { usePostSelfDeactivatedAccount } from "@/core/react-query/client";

export interface I_ModalDeactivateAccountProps extends I_ModalProps {
  variant?: keyof typeof Role;
  isLoading?: boolean;
}

const ModalDeactivateAccount = ({
  variant = "hacker",
  onClose = () => {},
  ...props
}: I_ModalDeactivateAccountProps) => {
  const {
    mutateAsync: mutateDeactivatedAccount,
    isPending: isPendingConfirm,
    isSuccess: isSuccessConfirm,
    variables,
  } = usePostSelfDeactivatedAccount();
  const [activeState, setActiveState] = useState<string>("information");

  const onClickVerifyDEactivatedAccount = async (password: string) => {
    await mutateDeactivatedAccount(password).then((res) => {
      if (res) {
        setActiveState("success");
      }
    });
  };

  const onCloseModal = () => {
    onClose();
    setActiveState("information");
  };

  const state: {
    [key: string]: JSX.Element;
  } = {
    information: (
      <Information onClose={onCloseModal} onClickVerify={setActiveState} />
    ),
    confirmation: (
      <Confirmation
        onClose={onCloseModal}
        isLoading={isPendingConfirm}
        disabled={isSuccessConfirm || isPendingConfirm}
        onClickVerify={onClickVerifyDEactivatedAccount}
      />
    ),
    success: <Success />,
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
export default ModalDeactivateAccount;
