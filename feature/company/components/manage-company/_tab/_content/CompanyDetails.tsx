import { useGetCountry } from "@/core/hooks";
import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { Button, Card, Country, Typography } from "@/core/ui/components";
import ModalForbiddden from "@/core/ui/container/modals/ModalForbidden";
import { Desktop, Mobile } from "@/core/ui/layout";
import { OptionsType } from "@/types/auth/sign-up";
import { FilePenLine } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CompanyDetails = ({
  data,
}: {
  data?: I_GetUserProfileSuccessResponse["data"];
}) => {
  const t = useTranslations("Settings.details");
  const country = useGetCountry();
  const dataCountry =
    (country &&
      country.data?.find((item) => item.value === data?.country_code)) ||
    ({} as OptionsType);
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start gap-6">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h5" weight="bold">
              {t("title", { role: t("company") })}
            </Typography>
            <Button
              variant="tertiary-company"
              prefixIcon={<FilePenLine />}
              className="p-0"
              onClick={() => setOpenModal(true)}
            />
          </div>
          <Card
            className={cn(
              "rounded-[10px]",
              "_flexbox__col__start__start gap-6 px-4 py-7.5"
            )}
          >
            <Typography variant="h6" weight="semibold">
              {t("company_information")}
            </Typography>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("label_logo")}
                </Typography>
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={data?.image as string}
                    alt={data?.name as string}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("label_name", { role: t("company") })}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.name}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("country")}
                </Typography>
                <Country icon={dataCountry.icon} label={dataCountry.label} />
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("address")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.address}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("state")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.state}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("zip")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.zip}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("address_2")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.address_2}
                </Typography>
              </div>
            </div>
            <div className="_flexbox__col__start__start w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {t("about", { role: t("company") })}
              </Typography>
              <Typography variant="p" affects="normal">
                {data?.about}
              </Typography>
            </div>
          </Card>
          <Card
            className={cn(
              "rounded-[10px]",
              "_flexbox__col__start__start gap-6 px-4 py-7.5"
            )}
          >
            <Typography variant="h6" weight="semibold">
              {t("account_details", { role: t("company") })}
            </Typography>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("label_email")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.email}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("company_website")}
                </Typography>
                <Link
                  href={
                    data?.website
                      ? data?.website.startsWith("http") ||
                        data?.website.startsWith("https")
                        ? data?.website
                        : "https://" + data?.website
                      : "#"
                  }
                >
                  <Typography variant="p" affects="normal">
                    {data?.website}
                  </Typography>
                </Link>
              </div>
            </div>
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("label_phone")}
            </Typography>
            <Typography variant="p" affects="normal">
              {data?.phone}
            </Typography>
          </Card>
        </div>
        <ModalForbiddden
          variant="company"
          title="Edit from Desktop"
          subtitle="Company Details are currently only editable on the desktop version of our website."
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
        />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start gap-6">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h5" weight="bold">
              {t("title", { role: t("company") })}
            </Typography>
            <Button
              asLink
              href={"/manage-company?edit=company_details"}
              variant="tertiary-company"
              prefixIcon={<FilePenLine />}
            >
              {t("button_edit_account", { role: t("company") })}
            </Button>
          </div>
          <Card
            className={cn(
              "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
              "_flexbox__col__start__start gap-6 p-7.5"
            )}
          >
            <Typography variant="h6" weight="bold">
              {t("company_information")}
            </Typography>
            <div className="grid w-full grid-cols-3 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("label_logo")}
                </Typography>
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={data?.image as string}
                    alt={data?.name as string}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("label_name", { role: t("company") })}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.name}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("country")}
                </Typography>
                <Country icon={dataCountry.icon} label={dataCountry.label} />
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("address")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.address}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("state")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.state}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("zip")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.zip}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("address_2")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.address_2}
                </Typography>
              </div>
            </div>
            <div className="_flexbox__col__start__start w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {t("about", { role: t("company") })}
              </Typography>
              <Typography variant="p" affects="normal">
                {data?.about}
              </Typography>
            </div>
          </Card>
          <Card
            className={cn(
              "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
              "_flexbox__col__start__start gap-6 xl:p-7.5"
            )}
          >
            <Typography variant="h6" weight="bold">
              {t("account_details", { role: t("company") })}
            </Typography>
            <div className="grid w-full grid-cols-2 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("label_email")}
                </Typography>
                <Typography variant="p" affects="normal">
                  {data?.email}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("company_website")}
                </Typography>
                <Link
                  href={
                    data?.website
                      ? data?.website.startsWith("http") ||
                        data?.website.startsWith("https")
                        ? data?.website
                        : "https://" + data?.website
                      : "#"
                  }
                >
                  <Typography variant="p" affects="normal">
                    {data?.website}
                  </Typography>
                </Link>
              </div>
            </div>
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("label_phone")}
            </Typography>
            <Typography variant="p" affects="normal">
              {data?.phone}
            </Typography>
          </Card>
        </div>
      </Desktop>
    </>
  );
};
export default CompanyDetails;
