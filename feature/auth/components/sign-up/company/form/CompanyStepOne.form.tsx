"use client";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { FormSchema } from "../SignUpCompany.component";
import { isObjectEmpty } from "@/utils/form-fill-validation";

interface I_CompanyStepOneProps {
  onClickNext: () => void;
}

const CompanyStepOne = ({ onClickNext }: I_CompanyStepOneProps) => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    resetField,
  } = useFormContext<FormSchema>();
  const forms = getValues();

  const onClickValidate = () => {
    onClickNext();
  };

  const validateIsFormFilled = isObjectEmpty({
    corporate_name: forms.corporate_name,
    corporate_website: forms.corporate_website,
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
            onClearInput={() => resetField("corporate_name")}
            value={forms.corporate_name}
            onChange={(e) =>
              setValue("corporate_name", e.target.value, {
                shouldValidate: true,
              })
            }
            isError={!!errors.corporate_name}
          />
          <Input
            type="text"
            label="Corporate Website"
            onClearInput={() => resetField("corporate_website")}
            value={forms.corporate_website}
            onChange={(e) =>
              setValue("corporate_website", e.target.value, {
                shouldValidate: true,
              })
            }
            isError={!!errors.corporate_website}
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
