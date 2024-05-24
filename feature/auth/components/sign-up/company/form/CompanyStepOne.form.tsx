"use client";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { SignupCompanyFormType } from "@/core/models/auth/register";

interface I_CompanyStepOneProps {
  onClickNext: () => void;
}

const CompanyStepOne = ({ onClickNext }: I_CompanyStepOneProps) => {
  const {
    formState: { errors },
    setValue,
    getValues,
    resetField,
  } = useFormContext<SignupCompanyFormType>();
  const forms = getValues();

  const onClickValidate = () => {
    onClickNext();
  };

  const validateIsFormFilled = isObjectEmpty({
    name: forms.name,
    website: forms.website,
  });

  return (
    <StepWrapper
      currentSteps={1}
      totalSteps={3}
      title="Company Sign Up"
      subtitle="Company Details"
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-7">
          <Input
            type="text"
            label="Corporate Name"
            onClearInput={() => resetField("name")}
            value={forms.name}
            onChange={(e) =>
              setValue("name", e.target.value, {
                shouldValidate: true,
              })
            }
            isError={!!errors.name}
          />
          <Input
            type="text"
            label="Corporate Website"
            onClearInput={() => resetField("website")}
            value={forms.website}
            onChange={(e) =>
              setValue("website", e.target.value, {
                shouldValidate: true,
              })
            }
            isError={!!errors.website}
          />
        </div>
        <Button
          fullWidth
          onClick={onClickValidate}
          disabled={validateIsFormFilled}
          variant="primary-company"
        >
          Next
        </Button>
      </div>
    </StepWrapper>
  );
};
export default CompanyStepOne;
