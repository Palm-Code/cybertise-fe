"use client";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import SelectDropdown from "@/core/ui/components/dropdown/select-dropdown";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { SignupCompanyFormType } from "@/core/models/auth/register";

interface I_CompanyStepTwoProps {
  onClickNext: () => void;
}

const CompanyStepTwo = ({ onClickNext }: I_CompanyStepTwoProps) => {
  const {
    formState: { errors },
    getValues,
    setValue,
    resetField,
  } = useFormContext<SignupCompanyFormType>();

  const forms = getValues();

  const onClickValidate = () => {
    onClickNext();
  };

  const validateIsFormFilled = isObjectEmpty({
    address: forms.address,
    country: forms.country_code,
    state: forms.state,
    city: forms.city,
    zip: forms.zip,
  });

  return (
    <StepWrapper
      currentSteps={2}
      totalSteps={3}
      title="Company Sign Up"
      subtitle="Correspondency Details"
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-7">
          <Input
            type="text"
            label="Address"
            onClearInput={() => resetField("address")}
            value={forms.address}
            onChange={(e) =>
              setValue("address", e.target.value, { shouldValidate: true })
            }
            isError={!!errors.address}
          />
          <Input
            type="text"
            label="Address Line 2"
            onClearInput={() => resetField("address_2")}
            value={forms.address_2}
            onChange={(e) =>
              setValue("address_2", e.target.value, {
                shouldValidate: true,
              })
            }
            description="Optional"
          />
          <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-2">
            <SelectDropdown
              label="Country"
              value={forms.country_code}
              withIcon
              withSearch
              options={countryOptions}
              onValueChange={(v) =>
                setValue("country_code", v, { shouldValidate: true })
              }
            />
            <SelectDropdown
              label="State"
              value={forms.state}
              withSearch
              options={countryOptions}
              onValueChange={(v) =>
                setValue("state", v, { shouldValidate: true })
              }
            />
            <SelectDropdown
              label="City"
              value={forms.city}
              withSearch
              options={countryOptions}
              onValueChange={(v) =>
                setValue("city", v, { shouldValidate: true })
              }
            />
            <Input
              type="text"
              label="Zip Code"
              onClearInput={() => resetField("zip")}
              value={forms.zip}
              onChange={(e) =>
                setValue("zip", e.target.value, { shouldValidate: true })
              }
              isError={!!errors.zip}
            />
          </div>
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
export default CompanyStepTwo;
