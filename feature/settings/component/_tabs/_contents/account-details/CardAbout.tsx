"use client";
import { useGetCountry } from "@/core/hooks";
import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { I_UpdateProfile } from "@/core/models/company/settings";
import {
  useGetCountryList,
  usePostTempFiles,
  usePostUpdateProfile,
} from "@/core/react-query/client";
import {
  Avatar,
  AvatarInput,
  Button,
  Card,
  Country,
  Input,
  Loader,
  SelectDropdown,
  TextArea,
  Typography,
} from "@/core/ui/components";
import HackerIcon from "@/core/ui/icons/hacker/Hacker.icon";
import { Desktop, Mobile } from "@/core/ui/layout";
import { countryOptions } from "@/feature/auth/constants/sign-up/hacker";
import { Role } from "@/types/admin/sidebar";
import { OptionsType } from "@/types/auth/sign-up";
import { Building2, UserRound } from "lucide-react";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

interface I_CardAboutProps {
  isEditing?: boolean;
  variant?: Role;
  data?: I_GetUserProfileSuccessResponse["data"];
}

const icons = (variant: Role) => {
  switch (variant) {
    case "hacker":
      return <HackerIcon className="h-8 w-8" />;
    case "company":
      return <Building2 className="h-8 w-8" />;
    case "mediator":
      return <UserRound className="mr-4 h-8 w-8" />;
    default:
      return <HackerIcon className="h-8 w-8" />;
  }
};

const CardAbout = ({ isEditing = false, variant, data }: I_CardAboutProps) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<I_UpdateProfile>();
  const forms = watch();
  const countryOptions = useGetCountry();
  const countryFlag =
    (countryOptions &&
      countryOptions.data.find(
        (country) => country.value === data?.country_code
      )) ||
    ({} as OptionsType);
  const { mutateAsync: mutate, isPending: isPendingUpload } =
    usePostTempFiles();

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setValue("logo", url, { shouldValidate: true });
      mutate(file).then((data) => {
        setValue("attachment_id", data?.data?.id, { shouldValidate: true });
      });
    }
  };

  if (isEditing)
    return (
      <>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl xl:p-7.5"
          )}
        >
          <Typography
            variant="h6"
            weight="bold"
            className="inline-flex items-center gap-4"
          >
            {icons(variant as Role)}
            {variant === "company" ? "Company Information" : "About You"}
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-6">
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {`${variant} ${variant === "company" ? "Logo" : "Avatar"}`}
                </Typography>
                {isPendingUpload ? (
                  <Loader
                    width={15}
                    height={15}
                    variant={variant}
                    className="h-12 w-12 rounded-full bg-neutral-light-90 dark:bg-neutral-dark-90"
                    noText
                  />
                ) : (
                  <Avatar
                    image={forms.logo}
                    initials=""
                    className="h-12 w-12"
                  />
                )}
              </div>
              <AvatarInput
                variant="company"
                onChange={(e) => handleChangeAvatar(e)}
              />
            </div>
            <Input
              type="text"
              label={`${variant} Name`}
              value={forms.name}
              containerClassName="capitalize"
              onChange={(e) => {
                setValue("name", e.target.value, { shouldValidate: true });
              }}
              isError={!!errors.name}
            />
          </div>
          {variant == "company" ? (
            <div className="_flexbox__col__start__start w-full gap-6">
              <Typography variant="h6" weight="bold">
                Company Address
              </Typography>
              <div className="_flexbox__col__start__start w-full gap-6">
                <Input
                  type="text"
                  label="Address"
                  value={forms.address}
                  onChange={(e) =>
                    setValue("address", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("address", "", { shouldValidate: true });
                  }}
                  isError={!!errors.address}
                />
                <Input
                  type="text"
                  label="Address 2"
                  value={forms.address_2}
                  onChange={(e) =>
                    setValue("address_2", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("address_2", "", { shouldValidate: true });
                  }}
                  description="Optional"
                />
                <div className="grid w-full grid-cols-3 gap-6">
                  <SelectDropdown
                    label="Country"
                    value={forms.country_code as string}
                    options={countryOptions?.data || []}
                    withIcon
                    withSearch
                    onValueChange={(e) => {
                      setValue("country_code", e, { shouldValidate: true });
                    }}
                  />
                  <Input
                    type="text"
                    label="State"
                    value={forms.state}
                    onChange={(e) =>
                      setValue("state", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    onClearInput={() => {
                      setValue("state", "", { shouldValidate: true });
                    }}
                    isError={!!errors.state}
                  />
                  <Input
                    type="text"
                    label="Zip Code"
                    value={forms.zip}
                    onChange={(e) =>
                      setValue("zip", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    onClearInput={() => {
                      setValue("zip", "", { shouldValidate: true });
                    }}
                    isError={!!errors.zip}
                  />
                </div>
              </div>
            </div>
          ) : (
            <SelectDropdown
              label="Country"
              value={forms.country_code}
              withIcon
              withSearch
              options={countryOptions?.data || []}
              onValueChange={(v) => {}}
            />
          )}

          <div className="_flexbox__col__start__start w-full gap-2.5">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              About {`${variant == "company" ? "Company" : "Your Account"}`}
            </Typography>
            <TextArea
              label={`About ${variant}`}
              value={forms.about}
              onChange={(e) =>
                setValue("about", e.target.value, { shouldValidate: true })
              }
              onClearInput={() => {
                setValue("about", "", { shouldValidate: true });
              }}
              isError={!!errors.about}
            />
          </div>
        </Card>
      </>
    );

  return (
    <>
      <Mobile>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl xl:p-7.5",
            "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
          )}
        >
          <Typography
            variant="h6"
            weight="bold"
            className="inline-flex items-center gap-4"
          >
            {icons(variant as Role)}
            {variant === "company" ? "Company Information" : "About You"}
          </Typography>
          <div className="_flexbox__col__start__start gap-6">
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {`${variant} ${variant === "company" ? "Logo" : "Avatar"}`}
            </Typography>
            <Avatar
              image={data?.company_logo}
              initials=""
              className="h-12 w-12"
            />
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {`${variant} Name`}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {data?.name}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
            >
              Country
            </Typography>
            <div className="_flexbox__row__center__start gap-2.5">
              <Country icon={countryFlag.icon} label={countryFlag?.label} />
            </div>
          </div>
          <div className="_flexbox__col__start__start w-full gap-2.5">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              About {variant == "company" ? "Company" : "Your Account"}
            </Typography>
            <Typography variant="p" affects="normal">
              {data?.about}
            </Typography>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl xl:p-7.5",
            "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
          )}
        >
          <Typography
            variant="h6"
            weight="bold"
            className="inline-flex items-center gap-4"
          >
            {icons(variant as Role)}
            {variant === "company" ? "Company Information" : "About You"}
          </Typography>
          <div className="grid w-full grid-cols-3 items-start gap-6">
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {`${variant} ${variant === "company" ? "Logo" : "Avatar"}`}
              </Typography>
              <Avatar
                image={data?.company_logo}
                initials="J"
                className="h-12 w-12"
              />
            </div>
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {`${variant} Name`}
              </Typography>
              <Typography variant="p" affects="normal" className="col-span-1">
                {data?.name}
              </Typography>
            </div>
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Country
              </Typography>
              <div className="_flexbox__row__center__start gap-2.5">
                <Country icon={countryFlag?.icon} label={countryFlag?.label} />
              </div>
            </div>
            {variant === "company" && (
              <>
                <div className="_flexbox__col__start__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    Address
                  </Typography>
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1"
                  >
                    {data?.address}
                  </Typography>
                </div>
                <div className="_flexbox__col__start__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    State
                  </Typography>
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1"
                  >
                    {data?.state}
                  </Typography>
                </div>
                <div className="_flexbox__col__start__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    Zip Code
                  </Typography>
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1"
                  >
                    {data?.zip}
                  </Typography>
                </div>
              </>
            )}
          </div>
          <div className="_flexbox__col__start__start w-full gap-2.5">
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              About {variant == "company" ? "Company" : "Your Account"}
            </Typography>
            <Typography variant="p" affects="normal">
              {data?.about}
            </Typography>
          </div>
        </Card>
      </Desktop>
    </>
  );
};
export default CardAbout;
