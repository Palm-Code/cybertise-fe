"use client";
import Button from "@/core/ui/components/button/button";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../SignUpHacker.component";
import { Input } from "@/core/ui/components";
import PasswordInput from "@/core/ui/components/input/password-input";
import { useState } from "react";
import { passwordValidation } from "@/core/constants/common";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { validatePassword } from "@/utils/password-validation";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import Checkbox from "@/core/ui/components/checkbox/checkbox";
import Typography from "@/core/ui/components/typography/typography";
import Link from "next/link";

interface I_HackerStepTwoProps {
  onClickNext: () => void;
}

const HackerStepTwo = ({ onClickNext }: I_HackerStepTwoProps) => {
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isPolicyChecked, setIsPolicyChecked] = useState<boolean>(false);
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
    setValue,
    getValues,
  } = useFormContext<FormSchema>();
  const forms = getValues();

  const submitForm = () => {
    setIsSubmit(true);
    setTimeout(() => {
      alert(JSON.stringify(forms, null, 2));
      setIsSubmit(false);
      onClickNext();
    }, 2000);
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
      currentSteps={2}
      totalSteps={2}
      title="Hacker Sign Up"
      subtitle="Account Setup"
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-8">
          <Input
            type="email"
            label="Email"
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
          variant="primary-hacker"
          onClick={submitForm}
          disabled={
            validateIsFormFilled ||
            isSubmit ||
            !isPolicyChecked ||
            !validatePasswordRegex
          }
          isLoading={isSubmit}
        >
          Register Account
        </Button>
      </div>
    </StepWrapper>
  );
};
export default HackerStepTwo;
