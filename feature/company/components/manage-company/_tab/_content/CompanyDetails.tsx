import { useGetCountry } from "@/core/hooks";
import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { Button, Card, Country, Typography } from "@/core/ui/components";
import ModalForbiddden from "@/core/ui/container/modals/ModalForbidden";
import { Desktop, Mobile } from "@/core/ui/layout";
import { OptionsType } from "@/types/auth/sign-up";
import { FilePenLine } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const CompanyDetails = ({
  data,
}: {
  data?: I_GetUserProfileSuccessResponse["data"];
}) => {
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
              Company Details
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
              Company Information
            </Typography>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Logo
                </Typography>
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={data?.company_logo as string}
                    alt={data?.name as string}
                    fill
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
                  Company Name
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
                  Country
                </Typography>
                <Country icon={dataCountry.icon} label={dataCountry.label} />
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Address
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
                  State
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
                  Zip Code
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
                  Address Line 2
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
                About Company
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
              Company Account Details
            </Typography>
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Registered email
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
                  Company Website
                </Typography>
                <Link href={data?.website || "#"}>
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
              Phone number
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
              Company Details
            </Typography>
            <Button
              asLink
              href={"/manage-company?edit=company_details"}
              variant="tertiary-company"
              prefixIcon={<FilePenLine />}
            >
              Edit Company Details
            </Button>
          </div>
          <Card
            className={cn(
              "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
              "_flexbox__col__start__start gap-6 p-7.5"
            )}
          >
            <Typography variant="h6" weight="bold">
              Company Information
            </Typography>
            <div className="grid w-full grid-cols-3 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Logo
                </Typography>
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={data?.company_logo as string}
                    alt={data?.name as string}
                    fill
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
                  Company Name
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
                  Country
                </Typography>
                <Country icon={dataCountry.icon} label={dataCountry.label} />
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Address
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
                  State
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
                  Zip Code
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
                  Address Line 2
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
                About Company
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
              Company Account Details
            </Typography>
            <div className="grid w-full grid-cols-2 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Registered email
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
                  Company Website
                </Typography>
                <Link href={data?.website || "#"}>
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
              Phone number
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
