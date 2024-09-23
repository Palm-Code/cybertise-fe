"use client";
import Button from "@/core/ui/components/button/button";
import { Input, SelectDropdown } from "@/core/ui/components";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { useGetCountry } from "@/core/hooks";
import {
  SignupCompanyFormType,
  SignupHackerFormType,
} from "@/core/models/auth/register";
import { useTranslations } from "next-intl";

interface I_HackerStepOneProps {
  onClickNext: () => void;
}

const HackerStepOne = ({ onClickNext }: I_HackerStepOneProps) => {
  const t = useTranslations("SignUp.hacker");
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
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-7">
          <Input
            type="text"
            label={t("label_username")}
            placeholderText={t("placeholder_username")}
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
            label={t("label_country")}
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
          {t("next_button")}
        </Button>
      </div>
    </StepWrapper>
  );
};
export default HackerStepOne;
