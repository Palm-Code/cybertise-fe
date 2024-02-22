"use client";
import Button from "@/core/ui/components/button";
import { Input } from "@/core/ui/components/input";
import { StepWrapper } from "@/core/ui/layout";
import { useForm, useFormContext } from "react-hook-form";
import { FormSchema, signupFormSchema } from "../SignUpHacker.component";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectDropdown from "@/core/ui/components/select-dropdown";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { isObjectEmpty } from "@/utils/form-fill-validation";

interface I_HackerStepOneProps {
  onClickNext: () => void;
}

const HackerStepOne = ({ onClickNext }: I_HackerStepOneProps) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useFormContext<FormSchema>();

  const onClickValidate = () => {
    onClickNext();
  };

  const validateIsFormFilled = isObjectEmpty({
    username: watch("username"),
    country: watch("country"),
  });

  return (
    <StepWrapper
      currentSteps={1}
      totalSteps={2}
      title="Hacker Sign Up"
      subtitle="Hacker Details"
    >
      <div className="_flexbox__col__center w-full gap-7">
        <Input
          type="text"
          label="Username"
          onClearInput={() => resetField("username")}
          {...register("username")}
          isError={!!errors.username}
        />
        <SelectDropdown
          label="Country"
          value={watch("country")}
          withIcon
          withSearch
          options={countryOptions}
          onValueChange={(v) => setValue("country", v)}
        />
      </div>
      <Button
        fullWidth
        onClick={onClickValidate}
        disabled={validateIsFormFilled}
      >
        Next to Step 2
      </Button>
    </StepWrapper>
  );
};
export default HackerStepOne;
