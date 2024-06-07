"use client";
import { passwordValidation } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetResetPasswordRequest } from "@/core/models/auth/forgot-password";
import {
  Card,
  Checkbox,
  PasswordInput,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, Desktop } from "@/core/ui/layout";
import { Role } from "@/types/admin/sidebar";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { validatePassword } from "@/utils/password-validation";
import { CircleAlert } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface I_CardEditPasswordProps {
  variant?: keyof typeof Role;
}

const CardEditPassword = ({ variant = "hacker" }: I_CardEditPasswordProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<I_GetResetPasswordRequest>();
  const forms = watch();
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      content: "",
      checked: false,
    });

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newPassword = e.target.value;

    const updatedValidationItems = validatePassword(
      passwordValidationItems,
      newPassword
    );

    setPasswordValidationItems(updatedValidationItems);
    confirmPassworText.content && confirmPassworText.content === newPassword;
    setConfirmPassworText({ ...confirmPassworText, checked: true });

    setValue("new_password", newPassword, { shouldValidate: true });
  };

  const passwordConfirmationCheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordMatch = forms.new_password === e.target.value;
    setValue("is_match", passwordMatch, { shouldValidate: true });
    setConfirmPassworText({
      ...confirmPassworText,
      content: e.target.value,
      checked: passwordMatch,
    });
  };
  return (
    <AnimationWrapper>
      <Desktop>
        <Card className="_flexbox__col__start__start w-full gap-8 xl:p-0">
          <Card
            className={cn(
              "_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12",
              "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Typography variant="h6" weight="bold">
              Confirm Current Password
            </Typography>
            <PasswordInput
              value={forms.old_password}
              onChange={(e) =>
                setValue("old_password", e.target.value, {
                  shouldValidate: true,
                })
              }
              isError={!!errors?.root}
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              label="Current password"
            />
          </Card>
          <Card
            className={cn(
              "_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12",
              "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Typography variant="h6" weight="bold">
              New Password
            </Typography>
            <PasswordInput
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              withRegex
              label="New password"
              options={passwordValidationItems}
              onChange={checkPassword}
            />
            <PasswordInput
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              label="Confirm new password"
              value={confirmPassworText.content}
              onChange={passwordConfirmationCheck}
              isConfirmation={!!confirmPassworText.content}
              check={confirmPassworText.checked}
            />
          </Card>
          <Card
            className={cn(
              "_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12",
              "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Typography variant="h6" weight="bold">
              Logout from all devices (optional)
            </Typography>
            <Card
              className={cn(
                "_flexbox__row__start__start w-full gap-4 xl:p-4",
                "bg-neutral-light-80 dark:bg-neutral-dark-80",
                "border border-neutral-light-60 dark:border-neutral-dark-60"
              )}
            >
              <CircleAlert />
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-10 dark:text-neutral-dark-10"
              >
                Logging out from all devices ensures that any potentially
                compromised sessions are terminated immediately. This is
                especially important if you suspect your account was accessed
                without your permission.
              </Typography>
            </Card>
            <div className="_flexbox__row__start__start w-full gap-4">
              <Checkbox
                variant={variant}
                checked={forms.logout_all === 1}
                onCheckedChange={() =>
                  setValue("logout_all", forms.logout_all ? 0 : 1, {
                    shouldValidate: true,
                  })
                }
              />
              <Typography variant="p" affects="small" className="leading-none">
                By selecting this option, you will be logged out from all
                devices currently signed into your account, including phones,
                tablets, and computers. You will need to log back in on each
                device using your new password
              </Typography>
            </div>
          </Card>
        </Card>
      </Desktop>
    </AnimationWrapper>
  );
};
export default CardEditPassword;
