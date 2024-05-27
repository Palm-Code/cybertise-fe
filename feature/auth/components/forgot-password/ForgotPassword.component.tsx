"use client";
import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography/typography";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { RectangleEllipsis } from "lucide-react";
import { Button, Checkbox, Input, PasswordInput } from "@/core/ui/components";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { passwordValidation } from "@/core/constants/common";
import {
  useGetRequestForgotPassword,
  usePostForgotPassword,
} from "../../query/password";
import { validatePassword } from "@/utils/password-validation";

interface I_ForgotPassword extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

const ForgotPassword = (props: I_ForgotPassword) => {
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const searchParams = useSearchParams();
  const token = searchParams.get("code");
  const [email, setEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [logoutAll, setLogoutAll] = useState<0 | 1>(0);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      content: "",
      checked: false,
    });
  const { mutate, isPending, isSuccess, error, isError } =
    useGetRequestForgotPassword();
  const {
    mutate: mutateForgotPassword,
    isPending: isPendingForgot,
    isSuccess: isSuccessForgot,
  } = usePostForgotPassword();

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newPassword = e.target.value;

    const updatedValidationItems = validatePassword(
      passwordValidationItems,
      newPassword
    );

    setPasswordValidationItems(updatedValidationItems);
    confirmPassworText.content && confirmPassworText.content !== newPassword
      ? setConfirmPassworText({ ...confirmPassworText, checked: false })
      : setConfirmPassworText({ ...confirmPassworText, checked: true });

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
    <div
      className={cn(
        "w-full max-w-[553px] rounded-lg bg-background-main-light dark:bg-background-main-dark",
        "_flexbox__col__center gap-28",
        props.noPadding ? "p-0" : "px-10 py-20",
        props.className
      )}
      {...props}
    >
      <div className="_flexbox__col__center w-full gap-6">
        <RectangleEllipsis width={72} height={72} />
        <Typography variant="h4" weight="bold">
          Forgot Password
        </Typography>
        <Typography variant="p" affects="normal" className="text-center">
          Please enter your email address to request a password reset
          verification link.
        </Typography>
        <div className="flex w-full flex-col items-center justify-center gap-7">
          {!!token ? (
            <>
              <PasswordInput
                withRegex
                value={newPassword}
                onChange={checkPassword}
                label="New password"
                options={passwordValidationItems}
              />
              <PasswordInput
                value={confirmPassworText.content}
                label="Confirm new password"
                onChange={passwordConfirmationCheck}
                isConfirmation={!!confirmPassworText.content}
                check={confirmPassworText.checked}
              />
              <div className="_flexbox__row__center__start w-full gap-4">
                <Checkbox
                  checked={logoutAll === 1}
                  onCheckedChange={() => setLogoutAll(logoutAll === 1 ? 0 : 1)}
                />
                <Typography variant="p" affects="normal" weight="bold">
                  Logout from all devices?
                </Typography>
              </div>
            </>
          ) : isSuccess ? (
            <Typography variant="p" affects="normal" className="text-center">
              We have just sent you a verification link to reset the password to{" "}
              <strong>{email}</strong> and continue to reset the password.
            </Typography>
          ) : (
            <Input
              type="Email"
              label="Email"
              value={email}
              isError={isError}
              errorMsg={error?.email[0]}
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
            isPending || isSuccess || isPendingForgot || isSuccessForgot
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
          Reset Password
        </Button>
        <Typography variant="p" affects="normal" align="center">
          Didn&apos;t have account yet?{" "}
          <Link href={"/auth/signin"} className="ml-2 font-semibold">
            Sign In
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default ForgotPassword;
