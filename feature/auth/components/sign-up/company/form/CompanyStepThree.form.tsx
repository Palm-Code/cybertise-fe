"use client";
import Button from "@/core/ui/components/button/button";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { Checkbox, Input, Typography } from "@/core/ui/components";
import PasswordInput from "@/core/ui/components/input/password-input";
import { useState } from "react";
import { passwordValidation } from "@/core/constants/common";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { validatePassword } from "@/utils/password-validation";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import Link from "next/link";
import { SignupCompanyFormType } from "@/core/models/auth/register";
import { usePostSignupCompany } from "@/feature/auth/query/signup";
import { getBrowserAndOS } from "@/utils/device-type";

interface I_CompanyStepThreeProps {
  onClickNext: () => void;
}

const CompanyStepThree = ({ onClickNext }: I_CompanyStepThreeProps) => {
  const [isPolicyChecked, setIsPolicyChecked] = useState<boolean>(false);
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      content: "",
      checked: false,
    });
  const {
    watch,
    formState: { errors },
    setValue,
    resetField,
  } = useFormContext<SignupCompanyFormType>();
  const forms = watch();

  const { mutateAsync, isPending, isSuccess } = usePostSignupCompany();

  const submitForm = () => {
    if (Object.keys(errors).length > 0) return;
    const userAgent = navigator.userAgent;
    const deviceType = getBrowserAndOS(userAgent);
    mutateAsync({ ...forms, device_type: deviceType }).then(() => {
      onClickNext();
    });
  };

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

  const validatePasswordRegex = passwordValidationItems.every(
    (item) => item.checked
  );

  return (
    <StepWrapper
      currentSteps={3}
      totalSteps={3}
      title="Company Sign Up"
      subtitle="Account Setup"
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-7">
          <Input
            type="email"
            label="Email"
            onClearInput={() => resetField("email")}
            value={forms.email}
            onChange={(e) =>
              setValue("email", e.target.value, { shouldValidate: true })
            }
            isError={!!errors.email}
          />
          <PasswordInput
            label="Password"
            onChange={checkPassword}
            options={passwordValidationItems}
            withRegex
          />
          <PasswordInput
            value={confirmPassworText.content}
            label="Confirm Password"
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
            <Typography variant="p" affects="normal">
              I have read and accepted the all sites{" "}
              <Link href={"/privacy-policy"} className="underline">
                Policies
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
            isPending ||
            isSuccess
          }
        >
          Register Account
        </Button>
      </div>
    </StepWrapper>
  );
};
export default CompanyStepThree;
