"use client";
import Button from "@/core/ui/components/button/button";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { Checkbox, Input, Typography } from "@/core/ui/components";
import PasswordInput from "@/core/ui/components/input/password-input";
import { useMemo, useState } from "react";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { validatePassword } from "@/utils/password-validation";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import Link from "next/link";
import { SignupCompanyFormType } from "@/core/models/auth/register";
import { usePostSignupCompany } from "@/feature/auth/query/signup";
import { getBrowserAndOS } from "@/utils/device-type";
import { useTranslations } from "next-intl";
import { usePasswordValidation } from "@/core/constants/common";
import { usePasswordStrength } from "@/core/lib";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";

interface I_CompanyStepThreeProps {
  onClickNext: () => void;
}

const CompanyStepThree = ({ onClickNext }: I_CompanyStepThreeProps) => {
  const t = useTranslations("SignUp.company");
  const [isPolicyChecked, setIsPolicyChecked] = useState<boolean>(false);
  const passwordValidation = usePasswordValidation();
  const [isBreached, setIsBreached] = useState<boolean>(false);
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      content: "",
      type: null,
      checked: false,
    });
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<SignupCompanyFormType>();
  const forms = watch();
  const [debounceValue] = useDebounceValue(forms.password, 1000);

  const { mutateAsync, isPending, isSuccess, error } = usePostSignupCompany();

  const submitForm = () => {
    if (Object.keys(errors).length > 0) return;
    const userAgent = navigator.userAgent;
    const deviceType = getBrowserAndOS(userAgent);
    mutateAsync({
      ...forms,
      password: btoa(forms.password),
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
      currentSteps={3}
      totalSteps={3}
      title={t("title")}
      subtitle={t("subtitle_3")}
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-7">
          <Input
            type="email"
            label={t("label_email")}
            placeholderText={t("placeholder_email")}
            onClearInput={() => setValue("email", "", { shouldValidate: true })}
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
              variant="company"
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
          variant="primary-company"
          onClick={submitForm}
          isLoading={isPending}
          disabled={
            validateIsFormFilled ||
            !validatePasswordRegex ||
            !isPolicyChecked ||
            isBreached ||
            isPending ||
            isSuccess ||
            !!errors.email
          }
        >
          {t("submit_button")}
        </Button>
      </div>
    </StepWrapper>
  );
};
export default CompanyStepThree;
