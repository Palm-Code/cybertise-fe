"use client";
import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography/typography";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import { RectangleEllipsis } from "lucide-react";
import { Button, PasswordInput } from "@/core/ui/components";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import {
  useGetRequestForgotPassword,
  usePostForgotPassword,
} from "../../query/password";
import { encryptPassword, validatePassword } from "@/utils/password-validation";
import { Desktop, Mobile } from "@/core/ui/layout";
import { usePasswordValidation } from "@/core/constants/common";
import { useDebounceValue } from "usehooks-ts";
import { usePasswordStrength } from "@/core/lib";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface I_SetPassword extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

const SetPassword = (props: I_SetPassword) => {
  const t = useTranslations("SetPassword");
  const passwordValidation = usePasswordValidation();
  const [isBreached, setIsBreached] = useState<boolean>(false);
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const searchParams = useSearchParams();
  const token = searchParams.get("code");
  const [newPassword, setNewPassword] = useState<string>("");
  const [debounceValue] = useDebounceValue(newPassword, 1000);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      type: null,
      content: "",
      checked: false,
    });
  const { isPending, isSuccess } = useGetRequestForgotPassword();
  const {
    mutate: mutateForgotPassword,
    isPending: isPendingForgot,
    isSuccess: isSuccessForgot,
  } = usePostForgotPassword();

  const validatePasswordRegex = passwordValidationItems.every(
    (item) => item.checked
  );

  useMemo(async () => {
    if (validatePasswordRegex) {
      const result = await usePasswordStrength(debounceValue);
      setIsBreached(!!result.feedback.warning);
      if (result.feedback.warning) {
        toast.error(result.feedback.warning, {
          position: "bottom-right",
        });
      }
    }
  }, [debounceValue]);

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newPassword = e.target.value;

    const updatedValidationItems = validatePassword(
      passwordValidationItems,
      newPassword
    );

    setPasswordValidationItems(updatedValidationItems);
    confirmPassworText.content && confirmPassworText.content === newPassword
      ? setConfirmPassworText({ ...confirmPassworText, checked: true })
      : setConfirmPassworText({ ...confirmPassworText, checked: false });

    setNewPassword(newPassword);
  };

  const passwordConfirmationCheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordMatch = newPassword === e.target.value;
    setConfirmPassworText({
      ...confirmPassworText,
      content: e.target.value,
      checked: passwordMatch,
    });
  };

  return (
    <>
      <Mobile className="px-6">
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg md:bg-background-main-light md:dark:bg-background-main-dark",
            "_flexbox__col__center gap-28",
            props.noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__col__center w-full gap-6">
            <RectangleEllipsis
              width={72}
              height={72}
            />
            <Typography
              variant="h4"
              weight="bold"
            >
              {t("title")}
            </Typography>
            <div className="flex w-full flex-col items-center justify-center gap-7">
              <PasswordInput
                isBreached={isBreached}
                withRegex
                value={newPassword}
                onChange={checkPassword}
                label={t("new_password")}
                options={passwordValidationItems}
              />
              <PasswordInput
                disabled={isBreached || !validatePasswordRegex}
                value={confirmPassworText.content}
                label={t("confirm_password")}
                onChange={passwordConfirmationCheck}
                isConfirmation={!!confirmPassworText.content}
                check={confirmPassworText.checked}
              />
            </div>
          </div>
          <div className="_flexbox__col__center w-full gap-4">
            <Button
              variant="default"
              fullWidth
              isLoading={isPending || isPendingForgot}
              disabled={
                isPending ||
                isSuccess ||
                isPendingForgot ||
                isSuccessForgot ||
                !confirmPassworText.checked ||
                isBreached ||
                !validatePasswordRegex
              }
              onClick={async () => {
                const newPasswordEncrypt = await encryptPassword(newPassword);
                token &&
                  mutateForgotPassword({
                    code: token,
                    new_password: newPasswordEncrypt,
                    logout_all: 0,
                  });
              }}
            >
              {t("submit_button")}
            </Button>
            <Typography
              variant="p"
              affects="normal"
              align="center"
            >
              {t("footer")}
              <Link
                href={"/auth/signin"}
                className="ml-2 font-semibold"
              >
                {t("link")}
              </Link>
            </Typography>
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg bg-background-main-light dark:bg-background-main-dark",
            "_flexbox__col__center gap-28",
            props.noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__col__center w-full gap-6">
            <RectangleEllipsis
              width={72}
              height={72}
            />
            <Typography
              variant="h4"
              weight="bold"
            >
              {t("title")}
            </Typography>
            <div className="flex w-full flex-col items-center justify-center gap-7">
              <PasswordInput
                isBreached={isBreached}
                withRegex
                value={newPassword}
                onChange={checkPassword}
                label={t("new_password")}
                options={passwordValidationItems}
              />
              <PasswordInput
                disabled={isBreached || !validatePasswordRegex}
                value={confirmPassworText.content}
                label={t("confirm_password")}
                onChange={passwordConfirmationCheck}
                isConfirmation={!!confirmPassworText.content}
                check={confirmPassworText.checked}
              />
            </div>
          </div>
          <div className="_flexbox__col__center w-full gap-4">
            <Button
              variant="default"
              fullWidth
              isLoading={isPending || isPendingForgot}
              disabled={
                isPending ||
                isSuccess ||
                isPendingForgot ||
                isSuccessForgot ||
                !confirmPassworText.checked ||
                isBreached ||
                !validatePasswordRegex
              }
              onClick={async () => {
                const newPasswordEncrypt = await encryptPassword(newPassword);
                token &&
                  mutateForgotPassword({
                    code: token,
                    new_password: newPasswordEncrypt,
                    logout_all: 0,
                  });
              }}
            >
              {t("submit_button")}
            </Button>
            <Typography
              variant="p"
              affects="normal"
              align="center"
            >
              {t("footer")}
              <Link
                href={"/auth/signin"}
                className="ml-2 font-semibold"
              >
                {t("link")}
              </Link>
            </Typography>
          </div>
        </div>
      </Desktop>
    </>
  );
};

export default SetPassword;
