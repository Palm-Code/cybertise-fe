"use client";
import Button from "@/core/ui/components/button";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../SignUpHacker.component";
import { Input } from "@/core/ui/components/input";
import PasswordInput from "@/core/ui/components/password-input";
import { useState } from "react";
import { passwordValidation } from "@/core/constants";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { validatePassword } from "@/utils/password-validation";
import { isObjectEmpty } from "@/utils/form-fill-validation";

interface I_HackerStepTwoProps {
  onClickNext: () => void;
}

const HackerStepTwo = ({ onClickNext }: I_HackerStepTwoProps) => {
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
  } = useFormContext<FormSchema>();

  const submitForm = () => {
    alert(JSON.stringify(watch(), null, 2));
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
      currentSteps={2}
      totalSteps={2}
      title="Hacker Sign Up"
      subtitle="Account Setup"
    >
      <Input
        type="email"
        label="Email"
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
export default HackerStepTwo;
