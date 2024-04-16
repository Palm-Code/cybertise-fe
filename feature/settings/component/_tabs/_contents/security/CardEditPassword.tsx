"use client";
import { passwordValidation } from "@/core/constants/common";
import { Card, Input, PasswordInput, Typography } from "@/core/ui/components";
import { AnimationWrapper, Desktop } from "@/core/ui/layout";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { useState } from "react";

const CardEditPassword = () => {
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  return (
    <AnimationWrapper>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-8">
          <Card className="_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12">
            <Typography variant="h6" weight="bold">
              Confirm Current Password
            </Typography>
            <PasswordInput type="password" label="Current password" />
          </Card>
          <Card className="_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12">
            <Typography variant="h6" weight="bold">
              New Password
            </Typography>
            <PasswordInput
              withRegex
              type="password"
              label="New password"
              options={passwordValidationItems}
            />
            <PasswordInput type="password" label="Confirm new password" />
          </Card>
        </div>
      </Desktop>
    </AnimationWrapper>
  );
};
export default CardEditPassword;
