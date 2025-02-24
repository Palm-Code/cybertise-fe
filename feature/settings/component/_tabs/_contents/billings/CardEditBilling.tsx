import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { I_UpdateProfile } from "@/core/models/company/settings";
import { Card, Input, Typography } from "@/core/ui/components";
import { ModalForbidden } from "@/core/ui/container";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { Role } from "@/types/admin/sidebar";
import { Banknote } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

interface I_CardEditBillingProps {
  variant: keyof typeof Role;
  data?: I_GetUserProfileSuccessResponse["data"];
}

const CardEditBilling = ({ variant, data }: I_CardEditBillingProps) => {
  const t = useTranslations("Settings.billings");
  const { watch, setValue } = useFormContext<I_UpdateProfile>();
  const forms = watch();
  return (
    <AnimationWrapper>
      <Mobile>
        <ModalForbidden
          variant={variant}
          isOpen
          onClose={() => {}}
        />
      </Mobile>
      <Desktop>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-6 rounded-xl p-7.5",
            "bg-background-page-light dark:bg-background-page-dark"
          )}
        >
          <Typography
            variant="h6"
            weight="bold"
            className="inline-flex"
          >
            <Banknote className="mr-4 h-8 w-8" />
            {t("payment_information")}
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-6">
            <Input
              type="text"
              label={t("bank_name")}
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              value={forms.bank_name}
              onChange={(e) =>
                setValue("bank_name", e.target.value, { shouldValidate: true })
              }
            />
            <Input
              type="number"
              inputMode="numeric"
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              pattern="[0-9]*"
              label={t("account_number")}
              value={forms.account_number}
              onChange={(e) => {
                setValue("account_number", e.target.value, {
                  shouldValidate: true,
                });
              }}
            />
            <Input
              type="text"
              label={t("holder_name")}
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              value={forms.holder_name}
              onChange={(e) =>
                setValue("holder_name", e.target.value, {
                  shouldValidate: true,
                })
              }
            />
            <div className="grid w-full grid-cols-3 gap-x-6">
              <Input
                type="text"
                label={t("vat")}
                wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                value={forms.vat}
                onChange={(e) =>
                  setValue("vat", e.target.value, { shouldValidate: true })
                }
              />
              <Input
                type="text"
                label={t("iban")}
                wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                value={forms.iban}
                onChange={(e) =>
                  setValue("iban", e.target.value, { shouldValidate: true })
                }
              />
              <Input
                type="text"
                label={t("bic")}
                wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                value={forms.bic}
                onChange={(e) =>
                  setValue("bic", e.target.value, { shouldValidate: true })
                }
              />
            </div>
          </div>
        </Card>
      </Desktop>
    </AnimationWrapper>
  );
};
export default CardEditBilling;
