"use client";
import Button from "@/core/ui/components/button/button";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { Input } from "@/core/ui/components";
import PasswordInput from "@/core/ui/components/input/password-input";
import { useEffect, useMemo, useState } from "react";
import { usePasswordValidation } from "@/core/constants/common";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { encryptPassword, validatePassword } from "@/utils/password-validation";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import Checkbox from "@/core/ui/components/checkbox/checkbox";
import Typography from "@/core/ui/components/typography/typography";
import Link from "next/link";
import { SignupHackerFormType } from "@/core/models/auth/register";
import { usePostSignupHacker } from "@/feature/auth/query/signup";
import { getBrowserAndOS } from "@/utils/device-type";
import { useTranslations } from "next-intl";
import { usePasswordStrength } from "@/core/lib";
import { toast } from "sonner";
import { useDebounceValue } from "usehooks-ts";

interface I_HackerStepTwoProps {
  onClickNext: () => void;
}

const HackerStepTwo = ({ onClickNext }: I_HackerStepTwoProps) => {
  const t = useTranslations("SignUp.hacker");
  const [isPolicyChecked, setIsPolicyChecked] = useState<boolean>(false);
  const [isBreached, setIsBreached] = useState<boolean>(false);
  const passwordValidation = usePasswordValidation();
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      content: "",
      type: null,
      checked: false,
    });
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<SignupHackerFormType>();
  const forms = watch();
  const [debounceValue] = useDebounceValue(forms.password, 1000);

  const { mutateAsync, isPending, isSuccess, error } = usePostSignupHacker();

  const submitForm = async () => {
    if (Object.keys(errors).length > 0) return;
    const userAgent = navigator.userAgent;
    const deviceType = getBrowserAndOS(userAgent);
    const passwordEncrypt = await encryptPassword(forms.password);
    mutateAsync({
      ...forms,
      password: passwordEncrypt,
      device_type: deviceType,
    }).then(() => {
      onClickNext();
    });
  };

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

    setValue("password", newPassword, { shouldValidate: true });
  };

  const passwordConfirmationCheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordMatch = forms.password === e.target.value;
    setConfirmPassworText({
      ...confirmPassworText,
      content: e.target.value,
      checked: passwordMatch,
    });
  };

  const validateIsFormFilled = isObjectEmpty({
    email: forms.email,
    password: forms.password,
    confirmPassworText: confirmPassworText.checked
      ? confirmPassworText.content
      : "",
  });

  return (
    <StepWrapper
      currentSteps={2}
      totalSteps={2}
      title={t("title")}
      subtitle={t("subtitle_2")}
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-8">
          <Input
            type="email"
            label={t("label_email")}
            placeholderText={t("placeholder_email")}
            value={forms.email}
            onChange={(e) =>
              setValue("email", e.target.value, { shouldValidate: true })
            }
            isError={!!errors.email || error?.code === 422}
          />
          <PasswordInput
            label={t("label_password")}
            placeholderText={t("placeholder_password")}
            value={forms.password}
            onChange={checkPassword}
            options={passwordValidationItems}
            isBreached={isBreached}
            withRegex
          />
          <PasswordInput
            disabled={isBreached || !validatePasswordRegex}
            label={t("label_confirm_password")}
            placeholderText={t("placeholder_confirm_password")}
            value={confirmPassworText.content}
            onChange={passwordConfirmationCheck}
            isConfirmation={!!confirmPassworText.content}
            check={confirmPassworText.checked}
          />
          <div className="_flexbox__row__center__start w-full gap-3">
            <Checkbox
              checked={isPolicyChecked}
              onCheckedChange={() => setIsPolicyChecked(!isPolicyChecked)}
            />
            <Typography
              variant="p"
              affects="normal"
            >
              {t("legal")}{" "}
              <Link
                target="_blank"
                href={"/policy"}
                className="underline"
              >
                {t("link")}
              </Link>
            </Typography>
          </div>
        </div>
        <Button
          fullWidth
          variant="primary-hacker"
          onClick={submitForm}
          disabled={
            validateIsFormFilled ||
            isPending ||
            isSuccess ||
            isBreached ||
            !isPolicyChecked ||
            !validatePasswordRegex ||
            !!errors.email
          }
          isLoading={isPending}
        >
          {t("submit_button")}
        </Button>
      </div>
    </StepWrapper>
  );
};
export default HackerStepTwo;
