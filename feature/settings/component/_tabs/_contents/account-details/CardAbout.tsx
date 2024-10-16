"use client";
import { useGetCountry } from "@/core/hooks";
import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { I_UpdateProfile } from "@/core/models/company/settings";
import { usePostTempFiles } from "@/core/react-query/client";
import {
  Avatar,
  AvatarInput,
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
import { Role } from "@/types/admin/sidebar";
import { OptionsType } from "@/types/auth/sign-up";
import { Building2, UserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";

interface I_CardAboutProps {
  isEditing?: boolean;
  variant?: keyof typeof Role;
  data?: I_GetUserProfileSuccessResponse["data"];
}

const icons = (variant: keyof typeof Role) => {
  switch (variant) {
    case "hacker":
      return <HackerIcon className="h-8 w-8" />;
    case "company":
      return <Building2 className="h-8 w-8" />;
    case "company staff":
      return <Building2 className="h-8 w-8" />;
    case "mediator":
      return <UserRound className="h-8 w-8" />;
    default:
      return <HackerIcon className="h-8 w-8" />;
  }
};

const CardAbout = ({ isEditing = false, variant, data }: I_CardAboutProps) => {
  const t = useTranslations("Settings.details");
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
      mutate(file).then((data) => {
        setValue("logo", url, { shouldValidate: true });
        setValue("attachment_id", data?.data?.id, { shouldValidate: true });
      });
    }
  };

  if (isEditing)
    return (
      <>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-8 rounded-xl xl:p-7.5",
            "bg-background-page-light dark:bg-background-page-dark"
          )}
        >
          <Typography
            variant="h6"
            weight="bold"
            className="inline-flex items-center gap-4"
          >
            {icons(variant as Role)}
            {variant === "company" ? t("company_information") : t("about_you")}
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-6">
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {`${variant === "company" ? t("label_logo") : t("label_avatar", { role: variant })}`}
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
                title={t("label_change_image", {
                  role: variant === "company" ? t("logo") : t("image"),
                })}
                variant={variant}
                onChange={(e) => handleChangeAvatar(e)}
              />
            </div>
            <Input
              type="text"
              label={t("label_name", {
                role: variant,
              })}
              value={variant === "hacker" ? forms.username : forms.name}
              containerClassName="capitalize"
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              onChange={(e) => {
                setValue(
                  variant === "hacker" ? "username" : "name",
                  e.target.value,
                  { shouldValidate: true }
                );
              }}
              isError={!!errors.name}
            />
          </div>
          {variant == "company" ? (
            <div className="_flexbox__col__start__start w-full gap-6">
              <Typography variant="h6" weight="bold">
                {t("company_address")}
              </Typography>
              <div className="_flexbox__col__start__start w-full gap-6">
                <Input
                  type="text"
                  label={t("address")}
                  value={forms.address}
                  wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
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
                  label={t("address_2")}
                  value={forms.address_2}
                  wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                  onChange={(e) =>
                    setValue("address_2", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("address_2", "", { shouldValidate: true });
                  }}
                  description={t("optional")}
                />
                <div className="grid w-full grid-cols-3 gap-6">
                  <SelectDropdown
                    label={t("country")}
                    value={forms.country_code as string}
                    wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                    options={countryOptions?.data || []}
                    withIcon
                    withSearch
                    onValueChange={(e) => {
                      setValue("country_code", e, { shouldValidate: true });
                    }}
                  />
                  <Input
                    type="text"
                    label={t("state")}
                    value={forms.state}
                    wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
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
                    label={t("zip")}
                    value={forms.zip}
                    wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
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
          ) : variant !== "mediator" && variant !== "company staff" ? (
            <SelectDropdown
              label={t("country")}
              value={forms.country_code as string}
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
              options={countryOptions?.data || []}
              withIcon
              withSearch
              onValueChange={(e) => {
                setValue("country_code", e, { shouldValidate: true });
              }}
            />
          ) : null}

          {variant !== "mediator" && variant !== "company staff" && (
            <div className="_flexbox__col__start__start w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {t("label_about_your_account", {
                  role: variant === "company" ? t("company") : t("account"),
                })}
              </Typography>
              <TextArea
                label={t("about", {
                  role: variant === "company" ? t("company") : variant,
                })}
                value={forms.about}
                wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                onChange={(e) =>
                  setValue("about", e.target.value, { shouldValidate: true })
                }
                onClearInput={() => {
                  setValue("about", "", { shouldValidate: true });
                }}
                isError={!!errors.about}
              />
            </div>
          )}
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
            {variant === "company" ? t("company_information") : t("about_you")}
          </Typography>
          <div className="_flexbox__col__start__start gap-6">
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {`${variant === "company" ? t("logo") : t("label_avatar", { role: variant })}`}
            </Typography>
            <Avatar image={data?.image} initials="" className="h-12 w-12" />
            <Typography
              variant="p"
              affects="normal"
              className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("label_name", {
                role: variant,
              })}
            </Typography>
            <Typography variant="p" affects="normal" className="col-span-1">
              {variant === "hacker" ? data?.username : data?.name}
            </Typography>
            {variant !== "mediator" && variant !== "company staff" && (
              <>
                <Typography
                  variant="p"
                  affects="normal"
                  className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("country")}
                </Typography>
                <div className="_flexbox__row__center__start gap-2.5">
                  <Country icon={countryFlag.icon} label={countryFlag?.label} />
                </div>
              </>
            )}
          </div>
          {variant !== "mediator" && variant !== "company staff" && (
            <div className="_flexbox__col__start__start w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {t("label_about_your_account", {
                  role: variant === "company" ? t("company") : t("account"),
                })}
              </Typography>
              <Typography variant="p" affects="normal">
                {data?.about}
              </Typography>
            </div>
          )}
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
            {variant === "company" ? t("company_information") : t("about_you")}
          </Typography>
          <div className="grid w-full grid-cols-3 items-start gap-6">
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {`${variant === "company" ? t("logo") : t("label_avatar", { role: variant })}`}
              </Typography>
              <Avatar image={data?.image} initials="C" className="h-12 w-12" />
            </div>
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {t("label_name", {
                  role: variant,
                })}
              </Typography>
              <Typography variant="p" affects="normal" className="col-span-1">
                {variant === "hacker" ? data?.username : data?.name}
              </Typography>
            </div>
            {variant !== "mediator" && variant !== "company staff" && (
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  {t("country")}
                </Typography>
                <div className="_flexbox__row__center__start gap-2.5">
                  {!!countryFlag && (
                    <Country
                      icon={countryFlag?.icon}
                      label={countryFlag?.label}
                    />
                  )}
                </div>
              </div>
            )}
            {variant === "company" && (
              <>
                <div className="_flexbox__col__start__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="normal"
                    className="col-span-1 capitalize text-neutral-light-40 dark:text-neutral-dark-40"
                  >
                    {t("address")}
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
                    {t("state")}
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
                    {t("zip")}
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
          {variant !== "mediator" && variant !== "company staff" && (
            <div className="_flexbox__col__start__start w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                {t("label_about_your_account", {
                  role: variant === "company" ? t("company") : t("account"),
                })}
              </Typography>
              <Typography variant="p" affects="normal">
                {data?.about}
              </Typography>
            </div>
          )}
        </Card>
      </Desktop>
    </>
  );
};
export default CardAbout;
