"use client";
import Button from "@/core/ui/components/button";
import { Input } from "@/core/ui/components/input";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../SignUpCompany.component";
import SelectDropdown from "@/core/ui/components/select-dropdown";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";

interface I_CompanyStepOneProps {
  onClickNext: () => void;
}

const CompanyStepOne = ({ onClickNext }: I_CompanyStepOneProps) => {
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
      title="Company Sign Up"
      subtitle="Company Details"
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
export default CompanyStepOne;
