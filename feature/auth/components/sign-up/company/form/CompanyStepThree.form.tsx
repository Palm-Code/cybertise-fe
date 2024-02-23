"use client";
import Button from "@/core/ui/components/button/button";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../SignUpCompany.component";
import { Input } from "@/core/ui/components/input/input";
import PasswordInput from "@/core/ui/components/input/password-input";
import { useState } from "react";
import { passwordValidation } from "@/core/constants";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { validatePassword } from "@/utils/password-validation";
import { isObjectEmpty } from "@/utils/form-fill-validation";

interface I_CompanyStepThreeProps {
  onClickNext: () => void;
}

const CompanyStepThree = ({ onClickNext }: I_CompanyStepThreeProps) => {
  const [passwordValidationItems, setPasswordValidationItems] =
    useState<PasswordValidationItemsType[]>(passwordValidation);
  const [confirmPassworText, setConfirmPassworText] =
    useState<PasswordValidationItemsType>({
      content: "",
      checked: false,
    });
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useFormContext<FormSchema>();

  const submitForm = () => {
    alert(JSON.stringify(watch(), null, 2));
    onClickNext();
  };

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const newPassword = e.target.value;

    const updatedValidationItems = validatePassword(
      passwordValidationItems,
      newPassword
    );

    setPasswordValidationItems(updatedValidationItems);

    setValue("password", newPassword, { shouldValidate: true });
  };

  const passwordConfirmationCheck = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const passwordMatch = watch("password") === e.target.value;
    setConfirmPassworText({
      ...confirmPassworText,
      content: e.target.value,
      checked: passwordMatch,
    });
  };

  const validateIsFormFilled = isObjectEmpty({
    email: watch("email"),
    password: watch("password"),
    confirmPassworText: confirmPassworText.checked
      ? confirmPassworText.content
      : "",
  });

  return (
    <StepWrapper
      currentSteps={3}
      totalSteps={3}
      title="Company Sign Up"
      subtitle="Account Setup"
    >
      <Input
        type="email"
        label="Email"
        onClearInput={() => resetField("email")}
        {...register("email")}
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
      <Button fullWidth onClick={submitForm} disabled={validateIsFormFilled}>
        Register Account
      </Button>
    </StepWrapper>
  );
};
export default CompanyStepThree;
