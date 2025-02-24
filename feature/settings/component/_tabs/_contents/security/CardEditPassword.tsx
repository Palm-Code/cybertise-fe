"use client";
import { usePasswordValidation } from "@/core/constants/common";
import { usePasswordStrength } from "@/core/lib";
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
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";

interface I_CardEditPasswordProps {
  variant?: keyof typeof Role;
}

const CardEditPassword = ({ variant = "hacker" }: I_CardEditPasswordProps) => {
  const t = useTranslations("Settings.security.login_info");
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<I_GetResetPasswordRequest>();
  const forms = watch();
  const [debounceValue] = useDebounceValue(forms.new_password, 1000);
  const passwordValidation = usePasswordValidation();
  const [isBreached, setIsBreached] = useState<boolean>(false);
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      type: null,
      content: "",
      checked: false,
    });
  const validatePasswordRegex = passwordValidationItems.every(
    (item) => item.checked
  );

  useMemo(async () => {
    if (validatePasswordRegex) {
      const result = await usePasswordStrength(debounceValue);
      setIsBreached(!!result.feedback.warning);
      if (result.feedback.warning) {
        setValue("isValidated", false, { shouldValidate: true });
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
    const isValidated = updatedValidationItems.every(
      (validationItem) => validationItem.checked
    );
    const isMatch = newPassword === confirmPassworText.content;
    setValue("is_match", isMatch, { shouldValidate: true });
    setValue("isValidated", isValidated, { shouldValidate: true });
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
            <Typography
              variant="h6"
              weight="bold"
            >
              {t("current_password")}
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
              label={t("label_current_password")}
            />
          </Card>
          <Card
            className={cn(
              "_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12",
              "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Typography
              variant="h6"
              weight="bold"
            >
              {t("new_password")}
            </Typography>
            <PasswordInput
              withRegex
              value={forms.new_password}
              label={t("label_new_password")}
              options={passwordValidationItems}
              isBreached={isBreached}
              onChange={checkPassword}
              {...(!isBreached && {
                wrapperClassName:
                  "bg-neutral-light-100 dark:bg-neutral-dark-100",
              })}
            />
            <PasswordInput
              disabled={isBreached || !watch().isValidated}
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              label={t("label_confirm_new_password")}
              id="confirm_new_password"
              value={confirmPassworText.content}
              onChange={passwordConfirmationCheck}
              isConfirmation={!!confirmPassworText.content}
              check={confirmPassworText.checked}
            />
          </Card>
          <Card
            className={cn(
              "_flexbox__col__start__start z-0 w-full gap-6 xl:px-8 xl:py-12",
              "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Typography
              variant="h6"
              weight="bold"
            >
              {t("logout_all")}
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
                {t("logout_all_description")}
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
              <Typography
                variant="p"
                affects="small"
                className="leading-none"
              >
                {t("logout_all_check")}
              </Typography>
            </div>
          </Card>
        </Card>
      </Desktop>
    </AnimationWrapper>
  );
};
export default CardEditPassword;
