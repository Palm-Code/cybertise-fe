"use client";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components/input/input";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../SignUpCompany.component";
import SelectDropdown from "@/core/ui/components/dropdown/select-dropdown";
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
    corporate_name: watch("corporate_name"),
    corporate_website: watch("corporate_website"),
  });

  return (
    <StepWrapper
      currentSteps={1}
      totalSteps={3}
      title="Company Sign Up"
      subtitle="Company Details"
    >
      <div className="_flexbox__col__center w-full gap-7">
        <Input
          type="text"
          label="Corporate Name"
          onClearInput={() => resetField("corporate_name")}
          {...register("corporate_name")}
          isError={!!errors.corporate_name}
        />
        <Input
          type="text"
          label="Corporate Website"
          onClearInput={() => resetField("corporate_website")}
          {...register("corporate_website")}
          isError={!!errors.corporate_website}
        />
      </div>
      <Button
        fullWidth
        onClick={onClickValidate}
        disabled={validateIsFormFilled}
      >
        Next
      </Button>
    </StepWrapper>
  );
};
export default CompanyStepOne;
