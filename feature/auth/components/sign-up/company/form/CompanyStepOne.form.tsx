"use client";
import Button from "@/core/ui/components/button/button";
import { Input } from "@/core/ui/components";
import { StepWrapper } from "@/core/ui/layout";
import { useFormContext } from "react-hook-form";
import { isObjectEmpty } from "@/utils/form-fill-validation";
import { SignupCompanyFormType } from "@/core/models/auth/register";
import { useTranslations } from "next-intl";

interface I_CompanyStepOneProps {
  onClickNext: () => void;
}

const CompanyStepOne = ({ onClickNext }: I_CompanyStepOneProps) => {
  const t = useTranslations("SignUp.company");
  const {
    formState: { errors },
    setValue,
    watch,
  } = useFormContext<SignupCompanyFormType>();
  const forms = watch();

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
      title={t("title")}
      subtitle={t("subtitle")}
    >
      <div className="_flexbox__col__center__between h-full w-full gap-8 pb-8">
        <div className="_flexbox__col__center w-full gap-7">
          <Input
            type="text"
            label={t("label_company_name")}
            placeholderText={t("placeholder_company_name")}
            onClearInput={() => setValue("name", "", { shouldValidate: true })}
            value={forms.name}
            onChange={(e) =>
              setValue("name", e.target.value, {
                shouldValidate: true,
              })
            }
            isError={!!errors.name}
          />
          <Input
            type="url"
            label={t("label_website")}
            placeholderText={t("placeholder_website")}
            onClearInput={() =>
              setValue("website", "", { shouldValidate: true })
            }
            value={forms.website}
            onChange={(e) =>
              setValue("website", e.target.value, {
                shouldValidate: true,
              })
            }
            isError={!!errors.website}
            errorMsg={
              errors.website?.type === "invalid_string"
                ? errors.website?.message
                : undefined
            }
          />
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
export default CompanyStepOne;
