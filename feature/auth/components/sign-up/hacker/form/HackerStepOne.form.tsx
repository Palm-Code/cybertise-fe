"use client";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import SelectDropdown from "@/core/ui/components/dropdown/select-dropdown";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { useGetCountry } from "@/core/hooks";
import {
  SignupCompanyFormType,
  SignupHackerFormType,
} from "@/core/models/auth/register";

interface I_HackerStepOneProps {
  onClickNext: () => void;
}

const HackerStepOne = ({ onClickNext }: I_HackerStepOneProps) => {
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<SignupHackerFormType>();
  const countryList = useGetCountry();
  const forms = watch();

  const onClickValidate = () => {
    onClickNext();
  };

  const validateIsFormFilled = isObjectEmpty({
    username: forms.username,
    country: forms.country_code,
  });

  return (
    <StepWrapper
      currentSteps={1}
      totalSteps={2}
      title="Hacker Sign Up"
      subtitle="Hacker Details"
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-7">
          <Input
            type="text"
            label="Username"
            onClearInput={() =>
              setValue("username", "", { shouldValidate: true })
            }
            value={forms.username}
            onChange={(e) =>
              setValue("username", e.target.value, { shouldValidate: true })
            }
            isError={!!errors.username}
          />
          <SelectDropdown
            label="Country"
            value={forms.country_code}
            withIcon
            withSearch
            options={countryList?.data || []}
            onValueChange={(v) =>
              setValue("country_code", v, { shouldValidate: true })
            }
          />
        </div>
        <Button
          fullWidth
          variant="primary-hacker"
          onClick={onClickValidate}
          disabled={validateIsFormFilled}
        >
          Next
        </Button>
      </div>
    </StepWrapper>
  );
};
export default HackerStepOne;
