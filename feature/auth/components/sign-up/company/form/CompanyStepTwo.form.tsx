"use client";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../SignUpCompany.component";
import SelectDropdown from "@/core/ui/components/dropdown/select-dropdown";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";

interface I_CompanyStepTwoProps {
  onClickNext: () => void;
}

const CompanyStepTwo = ({ onClickNext }: I_CompanyStepTwoProps) => {
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
    address: watch("address"),
    country: watch("country"),
    state: watch("state"),
    city: watch("city"),
    zip_code: watch("zip_code"),
  });

  return (
    <StepWrapper
      currentSteps={2}
      totalSteps={3}
      title="Company Sign Up"
      subtitle="Correspondency Details"
    >
      <div className="_flexbox__col__center w-full gap-7">
        <Input
          type="text"
          label="Address"
          onClearInput={() => resetField("address")}
          {...register("address")}
          isError={!!errors.corporate_name}
        />
        <Input
          type="text"
          label="Address Line 2"
          onClearInput={() => resetField("address_line_2")}
          {...register("address_line_2")}
          description="Optional"
        />
        <div className="grid w-full grid-cols-2 gap-7">
          <SelectDropdown
            label="Country"
            value={watch("country")}
            withIcon
            withSearch
            options={countryOptions}
            onValueChange={(v) => setValue("country", v)}
          />
          <SelectDropdown
            label="State"
            value={watch("state")}
            withSearch
            options={countryOptions}
            onValueChange={(v) => setValue("state", v)}
          />
          <SelectDropdown
            label="City"
            value={watch("city")}
            withSearch
            options={countryOptions}
            onValueChange={(v) => setValue("city", v)}
          />
          <Input
            type="text"
            label="Zip Code"
            onClearInput={() => resetField("zip_code")}
            {...register("zip_code")}
            isError={!!errors.zip_code}
          />
        </div>
      </div>
      <Button
        fullWidth
        onClick={onClickValidate}
        disabled={validateIsFormFilled}
        variant="primary-hacker"
      >
        Next
      </Button>
    </StepWrapper>
  );
};
export default CompanyStepTwo;
