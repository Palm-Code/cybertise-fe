import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { Card, Typography } from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import { Banknote } from "lucide-react";
import { useTranslations } from "next-intl";

interface I_CardBillingProps {
  data?: I_GetUserProfileSuccessResponse["data"];
}

const CardBilling = ({ data }: I_CardBillingProps) => {
  const t = useTranslations("Settings.billings");

  const menus = [
    t("bank_name"),
    t("account_number"),
    t("holder_name"),
    t("vat"),
    t("iban"),
    t("bic"),
  ];

  return (
    <>
      <Mobile>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl px-4 py-7"
          )}
        >
          <Typography variant="h5" weight="bold" className="inline-flex">
            <Banknote className="mr-4 h-8 w-8" />
            {t("payment_information")}
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-6">
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("bank_name")}
            </Typography>

            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.bank_name || "-"}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("account_number")}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.account_number || "-"}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("holder_name")}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.holder_name || "-"}
            </Typography>
          </div>
          <div className="_flexbox__col__start__start w-full gap-6">
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("vat")}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.vat || "-"}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("iban")}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.iban || "-"}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("bic")}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.bic || "-"}
            </Typography>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-6 rounded-xl p-7.5",
            "bg-neutral-light-100 dark:bg-neutral-dark-100"
          )}
        >
          <Typography variant="h6" weight="bold" className="inline-flex">
            <Banknote className="mr-4 h-8 w-8" />
            {t("payment_information")}
          </Typography>
          <div className="grid w-full grid-cols-3 gap-x-6 gap-y-2.5">
            {menus.slice(0, 3).map((menu) => (
              <Typography
                key={`menu-card-billing-${menu}`}
                variant="p"
                affects="normal"
                className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {menu}
              </Typography>
            ))}
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.bank_name || "-"}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.account_number || "-"}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.holder_name || "-"}
            </Typography>
          </div>
          <div className="grid w-full grid-cols-3 gap-x-6 gap-y-2.5">
            {menus.slice(3, 6).map((menu) => (
              <Typography
                key={`menu-card-billing-ID-${menu}`}
                variant="p"
                affects="normal"
                className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {menu}
              </Typography>
            ))}
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.vat || "-"}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.iban || "-"}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.bic || "-"}
            </Typography>
          </div>
        </Card>
      </Desktop>
    </>
  );
};
export default CardBilling;
