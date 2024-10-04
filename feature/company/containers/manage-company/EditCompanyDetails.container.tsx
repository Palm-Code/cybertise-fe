import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import {
  AvatarInput,
  Button,
  Card,
  Input,
  Loader,
  SelectDropdown,
  TextArea,
  Typography,
} from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import EditNavBar from "../../components/manage-company/_cards/EditNavBar";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
  I_UpdateProfile,
  updatePorfileSchema,
} from "@/core/models/company/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetCountry } from "@/core/hooks";
import {
  usePostTempFiles,
  usePostUpdateProfile,
} from "@/core/react-query/client";
import { toast } from "sonner";
import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";

const EditCompnayDetails = ({
  data,
}: {
  data?: I_GetUserProfileSuccessResponse["data"];
}) => {
  const t = useTranslations("Settings.details");
  const countryOptions = useGetCountry();
  const {
    watch,
    setValue,
    formState: { errors },
  } = useForm<I_UpdateProfile>({
    resolver: zodResolver(updatePorfileSchema),
    defaultValues: {
      name: data?.name,
      about: data?.about,
      address: data?.address,
      address_2: data?.address_2 || "",
      state: data?.state,
      city: data?.city,
      country_code: data?.country_code,
      email: data?.email,
      phone: data?.phone,
      want_news: data?.want_news,
      website: data?.website,
      zip: data?.zip,
      logo: data?.image,
    },
  });
  const { mutateAsync, isPending, isSuccess } = usePostUpdateProfile();
  const { mutateAsync: mutate, isPending: isPendingUpload } =
    usePostTempFiles();
  const forms = watch();
  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setValue("logo", url, { shouldValidate: true });
      mutate(file).then((data) => {
        setValue("logo", data?.data?.file, { shouldValidate: true });
        setValue("attachment_id", data?.data?.id, { shouldValidate: true });
      });
    }
  };

  const handleSubmitForm = () => {
    if (Object.values(errors).length === 0) {
      mutateAsync(forms);
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <>
      <Mobile>
        <EmptyState variant="company" type="default" />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-8">
          <EditNavBar title="Edit Company Details" />
          <Card
            className={cn(
              "_flexbox__col__start__start relative z-20 w-full gap-8 rounded-lg",
              "bg-background-main-light px-6 py-8 xl:p-9 xl:px-6 xl:py-12 dark:bg-background-main-dark"
            )}
          >
            <Card
              className={cn(
                "rounded-xl xl:px-8 xl:py-12",
                "_flexbox__col__start__start w-full gap-8",
                "bg-background-page-light dark:bg-background-page-dark"
              )}
            >
              <div className="_flexbox__col__start__start w-full gap-6">
                <Typography variant="h6" weight="bold">
                  {t("company_information")}
                </Typography>
                <div className="_flexbox__col__start__start w-full gap-2.5">
                  <div className="_flexbox__row__center__between w-full">
                    <div className="_flexbox__col__start__start gap-2.5">
                      <Typography
                        variant="p"
                        affects="normal"
                        className="text-neutral-light-40 dark:text-neutral-dark-40"
                      >
                        {t("label_logo")}
                      </Typography>
                      <div className="relative h-12 w-12 overflow-hidden rounded-full">
                        {isPendingUpload ? (
                          <Loader
                            width={15}
                            height={15}
                            variant="company"
                            className="h-full w-full bg-neutral-light-90 dark:bg-neutral-dark-90"
                            noText
                          />
                        ) : (
                          <Image
                            src={forms.logo as string}
                            alt={data?.name as string}
                            fill
                            sizes="100%"
                            className="object-cover"
                          />
                        )}
                      </div>
                    </div>
                    <AvatarInput
                      title={t("label_change_image", { role: t("logo") })}
                      variant="company"
                      onChange={(e) => handleChangeAvatar(e)}
                    />
                  </div>
                  <Input
                    type="text"
                    label={t("label_name", { role: t("company") })}
                    value={forms.name}
                    wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                    onChange={(e) =>
                      setValue("name", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    onClearInput={() => {
                      setValue("name", "", { shouldValidate: true });
                    }}
                    isError={!!errors.name}
                  />
                </div>
              </div>
              <div className="_flexbox__col__start__start w-full gap-6">
                <Typography variant="h6" weight="bold">
                  {t("company")} {t("address")}
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
                    description="Optional"
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
              <div className="_flexbox__col__start__start w-full gap-6">
                <Typography variant="h6" weight="bold">
                  {t("about", { role: t("company") })}
                </Typography>
                <div className="_flexbox__col__start__start w-full gap-6">
                  <TextArea
                    type="text"
                    label={t("about", { role: t("company") })}
                    value={forms.about}
                    wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                    onChange={(e) =>
                      setValue("about", e.target.value, {
                        shouldValidate: true,
                      })
                    }
                    onClearInput={() => {
                      setValue("about", "", { shouldValidate: true });
                    }}
                    isError={!!errors.about}
                  />
                </div>
              </div>
            </Card>
            <Card
              className={cn(
                "rounded-xl xl:px-8 xl:py-12",
                "_flexbox__col__start__start w-full gap-8",
                "bg-background-page-light dark:bg-background-page-dark"
              )}
            >
              <div className="_flexbox__col__start__start w-full gap-6">
                <Typography variant="h6" weight="bold">
                  {t("account_details", { role: t("company") })}
                </Typography>
                <Input
                  type="email"
                  label={t("label_email")}
                  value={forms.email}
                  wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                  onChange={(e) =>
                    setValue("email", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  disabled
                  onClearInput={() => {
                    setValue("email", "", { shouldValidate: true });
                  }}
                  isError={!!errors.email}
                />
                <Input
                  type="text"
                  label={t("company_website")}
                  value={forms.website}
                  wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                  onChange={(e) =>
                    setValue("website", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("website", "", { shouldValidate: true });
                  }}
                  isError={!!errors.website}
                />
                <Input
                  type="tel"
                  pattern="[0-9]*"
                  inputMode="numeric"
                  label={t("label_phone")}
                  maxLength={25}
                  value={forms.phone}
                  wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
                  onChange={(e) =>
                    setValue("phone", e.target.value, {
                      shouldValidate: true,
                    })
                  }
                  onClearInput={() => {
                    setValue("phone", "", { shouldValidate: true });
                  }}
                  isError={!!errors.phone}
                />
              </div>
            </Card>
            <div className="_flexbox__row__center gap-6">
              <Button asLink href="/manage-company" variant="secondary-company">
                {t("button_discard")}
              </Button>
              <Button
                variant="primary-company"
                disabled={isPending || isSuccess || isPendingUpload}
                isLoading={isPending}
                onClick={handleSubmitForm}
              >
                {t("button_save")}
              </Button>
            </div>
          </Card>
        </div>
      </Desktop>
    </>
  );
};
export default EditCompnayDetails;
