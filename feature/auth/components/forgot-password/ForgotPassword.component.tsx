"use client";
import { cn } from "@/core/lib/utils";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import Link from "next/link";
import { redirect, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { OTPInput, SlotProps } from "input-otp";
import { RectangleEllipsis } from "lucide-react";
import { Button, Input, PasswordInput } from "@/core/ui/components";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { passwordValidation } from "@/core/constants/common";

interface I_ForgotPassword extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

const ForgotPassword = (props: I_ForgotPassword) => {
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const searchParams = useSearchParams();
  const token = searchParams.get("reset_password_token");
  const [email, setEmail] = useState<string>("");
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
          {/* <Typography variant="p" affects="normal" className="text-center">
            We have just sent you a verification link to reset the password to
            <strong>joh****@example.com</strong>
            and continue to reset the password.
          </Typography> */}
          <PasswordInput
            withRegex
            type="password"
            label="New password"
            options={passwordValidationItems}
          />
          <PasswordInput type="password" label="Confirm new password" />
          <Input type="Email" label="Email" />
        </div>
      </div>
      <div className="_flexbox__col__center w-full gap-4">
        <Button variant="default" fullWidth>
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
