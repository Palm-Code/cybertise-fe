"use client";
import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography/typography";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RectangleEllipsis } from "lucide-react";
import { Button, Checkbox, Input, PasswordInput } from "@/core/ui/components";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import {
  useGetRequestForgotPassword,
  usePostForgotPassword,
} from "../../query/password";
import { validatePassword } from "@/utils/password-validation";
import { Desktop, Mobile } from "@/core/ui/layout";
import useTimer from "@/utils/timer";
import { usePostResendVerification } from "../../query/resend-verification";
import { useTranslations } from "next-intl";
import { usePasswordValidation } from "@/core/constants/common";

interface I_ForgotPassword extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

const ForgotPassword = (props: I_ForgotPassword) => {
  const t = useTranslations("ForgotPassword");
  const passwordValidation = usePasswordValidation();
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const [count, setCount] = React.useState(5);
  const [validated, setValidated] = useState(false);
  const initialDuration = count * 60 * 1000;
  const { remainingTime, start, getFormattedTime } = useTimer(initialDuration);
  const searchParams = useSearchParams();
  const token = searchParams.get("code");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [logoutAll, setLogoutAll] = useState<0 | 1>(0);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      content: "",
      type: null,
      checked: false,
    });
  const { mutate, isPending, isSuccess, error, isError } =
    useGetRequestForgotPassword();
  const {
    mutate: mutateForgotPassword,
    isPending: isPendingForgot,
    isSuccess: isSuccessForgot,
  } = usePostForgotPassword();

  const { mutate: resendVerification } = usePostResendVerification();

  useEffect(() => {
    if (isSuccess) start();
  }, [isSuccess]);

  useEffect(() => {
    if (remainingTime === 0) {
      setCount(count + 5);
    }
  }, [remainingTime]);

  const onClickResend = () => {
    resendVerification({
      email: email,
      action: "forgot_password",
    });
    start();
  };

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
    const isValidated = updatedValidationItems.every((item) => item.checked);
    setValidated(isValidated);
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
            <RectangleEllipsis width={72} height={72} />
            <Typography variant="h4" weight="bold">
              {t("title")}
            </Typography>
            {!isSuccess && (
              <Typography variant="p" affects="normal" className="text-center">
                {t("description")}
              </Typography>
            )}
            <div className="flex w-full flex-col items-center justify-center gap-7">
              {!!token ? (
                <>
                  <PasswordInput
                    withRegex
                    value={newPassword}
                    onChange={checkPassword}
                    label={t("label_new_password")}
                    placeholderText={t("placeholder_new_password")}
                    options={passwordValidationItems}
                  />
                  <PasswordInput
                    value={confirmPassworText.content}
                    label={t("label_confirm_password")}
                    placeholderText={t("placeholder_confirm_password")}
                    onChange={passwordConfirmationCheck}
                    isConfirmation={!!confirmPassworText.content}
                    check={confirmPassworText.checked}
                  />
                  <div className="_flexbox__row__center__start w-full gap-4">
                    <Checkbox
                      name="logout-all-checkbox-mobile"
                      checked={logoutAll === 1}
                      onCheckedChange={() =>
                        setLogoutAll(logoutAll === 1 ? 0 : 1)
                      }
                    />
                    <Typography variant="p" affects="normal" weight="bold">
                      {t("footer_2")}
                    </Typography>
                  </div>
                </>
              ) : isSuccess ? (
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-center"
                >
                  {t.rich("verification_text", {
                    strong: () => <strong>{email}</strong>,
                  })}
                </Typography>
              ) : (
                <Input
                  type="email"
                  label={t("label")}
                  placeholderText={t("placeholder")}
                  value={email}
                  isError={isError}
                  errorMsg={error?.message}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="_flexbox__col__center w-full gap-4">
            <Button
              variant="default"
              fullWidth
              isLoading={isPending || isPendingForgot}
              disabled={
                isPending ||
                (isSuccess && remainingTime > 0) ||
                isPendingForgot ||
                isSuccessForgot ||
                (token ? !newPassword || !confirmPassworText.checked : !email)
              }
              onClick={() =>
                token
                  ? mutateForgotPassword({
                      code: token,
                      new_password: newPassword,
                      logout_all: 1,
                    })
                  : mutate(email)
              }
            >
              {isSuccess
                ? `${t("resend_button")} ${remainingTime > 0 ? `(${getFormattedTime()})` : ""}`
                : t("submit_button")}
            </Button>
            <Typography variant="p" affects="normal" align="center">
              {t("footer")}
              <Link href={"/auth/signin"} className="ml-2 font-semibold">
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
            <RectangleEllipsis width={72} height={72} />
            <Typography variant="h4" weight="bold">
              {t("title")}
            </Typography>
            {!isSuccess && (
              <Typography variant="p" affects="normal" className="text-center">
                {t("description")}
              </Typography>
            )}
            <div className="flex w-full flex-col items-center justify-center gap-7">
              {!!token ? (
                <>
                  <PasswordInput
                    withRegex
                    value={newPassword}
                    onChange={checkPassword}
                    label={t("label_new_password")}
                    placeholderText={t("placeholder_new_password")}
                    options={passwordValidationItems}
                  />
                  <PasswordInput
                    value={confirmPassworText.content}
                    label={t("label_confirm_password")}
                    placeholderText={t("placeholder_confirm_password")}
                    onChange={passwordConfirmationCheck}
                    isConfirmation={!!confirmPassworText.content}
                    check={confirmPassworText.checked}
                  />
                  <div className="_flexbox__row__center__start w-full gap-4">
                    <Checkbox
                      name="logout-all-checkbox"
                      checked={logoutAll === 1}
                      onCheckedChange={() =>
                        setLogoutAll(logoutAll === 1 ? 0 : 1)
                      }
                    />
                    <Typography variant="p" affects="normal" weight="bold">
                      {t("footer_2")}
                    </Typography>
                  </div>
                </>
              ) : isSuccess ? (
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-center"
                >
                  {t.rich("verification_text", {
                    strong: () => <strong>{email}</strong>,
                  })}
                </Typography>
              ) : (
                <Input
                  type="email"
                  label={t("label")}
                  placeholderText={t("placeholder")}
                  value={email}
                  isError={isError}
                  errorMsg={error?.message}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
            </div>
          </div>
          <div className="_flexbox__col__center w-full gap-4">
            <Button
              variant="default"
              fullWidth
              isLoading={isPending || isPendingForgot}
              disabled={
                isPending ||
                (isSuccess && remainingTime > 0) ||
                isPendingForgot ||
                isSuccessForgot ||
                (token ? !confirmPassworText.checked || !validated : !email)
              }
              onClick={() => {
                isSuccess
                  ? onClickResend()
                  : token
                    ? mutateForgotPassword({
                        code: token,
                        new_password: newPassword,
                        logout_all: 1,
                      })
                    : mutate(email);
              }}
            >
              {isSuccess
                ? `${t("resend_button")} ${remainingTime > 0 ? `(${getFormattedTime()})` : ""}`
                : t("submit_button")}
            </Button>
            <Typography variant="p" affects="normal" align="center">
              {t("footer")}
              <Link href={"/auth/signin"} className="ml-2 font-semibold">
                {t("link")}
              </Link>
            </Typography>
          </div>
        </div>
      </Desktop>
    </>
  );
};

export default ForgotPassword;
