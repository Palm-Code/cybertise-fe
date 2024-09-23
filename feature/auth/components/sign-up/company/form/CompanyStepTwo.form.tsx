"use client";
import Button from "@/core/ui/components/button/button";
import { Input, SelectDropdown } from "@/core/ui/components";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { SignupCompanyFormType } from "@/core/models/auth/register";
import { useGetCountry } from "@/core/hooks";
import { useTranslations } from "next-intl";

interface I_CompanyStepTwoProps {
  onClickNext: () => void;
}

const CompanyStepTwo = ({ onClickNext }: I_CompanyStepTwoProps) => {
  const t = useTranslations("SignUp.company");
  const countryList = useGetCountry();
  const {
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<SignupCompanyFormType>();

  const forms = watch();

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
      title={t("title")}
      subtitle={t("subtitle_2")}
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-7">
          <Input
            type="text"
            label={t("label_address")}
            placeholderText={t("placeholder_address")}
            onClearInput={() =>
              setValue("address", "", { shouldValidate: true })
            }
            value={forms.address}
            onChange={(e) =>
              setValue("address", e.target.value, { shouldValidate: true })
            }
            isError={!!errors.address}
          />
          <Input
            type="text"
            label={t("label_address_2")}
            placeholderText={t("placeholder_address_2")}
            onClearInput={() =>
              setValue("address_2", "", {
                shouldValidate: true,
              })
            }
            value={forms.address_2}
            onChange={(e) =>
              setValue("address_2", e.target.value, {
                shouldValidate: true,
              })
            }
            description={t("label_optional")}
          />
          <div className="grid w-full grid-cols-1 gap-7 md:grid-cols-2">
            <SelectDropdown
              label={t("label_country")}
              value={forms.country_code}
              withIcon
              withSearch
              options={countryList?.data || []}
              onValueChange={(v) =>
                setValue("country_code", v, { shouldValidate: true })
              }
            />
            <Input
              type="text"
              label={t("label_state")}
              placeholderText={t("placeholder_state")}
              onClearInput={() =>
                setValue("state", "", { shouldValidate: true })
              }
              value={forms.state}
              onChange={(e) =>
                setValue("state", e.target.value, { shouldValidate: true })
              }
              isError={!!errors.state}
            />
            <Input
              type="text"
              label={t("label_city")}
              placeholderText={t("placeholder_city")}
              onClearInput={() =>
                setValue("city", "", { shouldValidate: true })
              }
              value={forms.city}
              onChange={(e) =>
                setValue("city", e.target.value, { shouldValidate: true })
              }
              isError={!!errors.city}
            />
            <Input
              type="text"
              label={t("label_zip")}
              placeholderText={t("placeholder_zip")}
              onClearInput={() => setValue("zip", "", { shouldValidate: true })}
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
          {t("next_button")}
        </Button>
      </div>
    </StepWrapper>
  );
};
export default CompanyStepTwo;
