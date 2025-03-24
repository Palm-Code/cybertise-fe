import { Button, Card, Typography } from "@/core/ui/components";
import { FilePenLine, X } from "lucide-react";
import CardAbout from "../component/_tabs/_contents/account-details/CardAbout";
import CardAccountDetails from "../component/_tabs/_contents/account-details/CardAccountDetails";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { cn } from "@/core/lib/utils";
import { Role } from "@/types/admin/sidebar";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { useState } from "react";
import { ModalForbidden } from "@/core/ui/container";
import { useFormContext } from "react-hook-form";
import { I_UpdateProfile } from "@/core/models/company/settings";
import { usePostUpdateProfile } from "@/core/react-query/client";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface I_DetailsProps {
  variant: keyof typeof Role;
  isEditing: boolean;
  handleClickEdit: (v: boolean) => void;
  data?: I_GetUserProfileSuccessResponse["data"];
}

const Details = ({
  variant,
  isEditing,
  handleClickEdit,
  data,
}: I_DetailsProps) => {
  const t = useTranslations("Settings.details");
  const {
    watch,
    formState: { errors },
  } = useFormContext<I_UpdateProfile>();
  const { mutateAsync, isPending, isSuccess } = usePostUpdateProfile(true);
  const [modalForbidden, setModalForbidden] = useState<boolean>(false);

  const handleSubmitForm = () => {
    if (Object.values(errors).length === 0) {
      mutateAsync(watch()).then(() => {
        handleClickEdit(false);
      });
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  if (isEditing)
    return (
      <>
        <Desktop>
          <div className="_flexbox__col__start__start w-full gap-6">
            <Card
              className={cn(
                "rounded-2xl rounded-b-none xl:px-8 xl:py-6",
                "_flexbox__row__center__between w-full"
              )}
            >
              <div className="_flexbox__row__center__start gap-5">
                <Button
                  variant={`tertiary-${variant}`}
                  prefixIcon={<X />}
                  className="p-0"
                  onClick={() => handleClickEdit(false)}
                />
                <Typography
                  variant="h5"
                  weight="bold"
                  className="capitalize"
                >
                  {t("button_edit_account", {
                    role: variant === "company" ? t("company") : variant,
                  })}
                </Typography>
              </div>
            </Card>
            <AnimationWrapper>
              <Card className="_flexbox__col__start__start w-full gap-8 xl:px-6 xl:py-12">
                <CardAbout
                  isEditing
                  variant={variant as Role}
                />
                <CardAccountDetails
                  isEditing
                  variant={variant as Role}
                />
                <div className="_flexbox__row__center__start gap-6">
                  <Button
                    variant={`secondary-${variant}`}
                    onClick={() => handleClickEdit(false)}
                  >
                    {t("button_discard")}
                  </Button>
                  <Button
                    disabled={isPending || isSuccess}
                    isLoading={isPending}
                    variant={`primary-${variant}`}
                    onClick={() => handleSubmitForm()}
                  >
                    {t("button_save")}
                  </Button>
                </div>
              </Card>
            </AnimationWrapper>
          </div>
        </Desktop>
      </>
    );
  return (
    <>
      <Mobile className="space-y-6">
        <div className="_flexbox__row__center__between mb-6 w-full">
          <Typography
            variant="h5"
            weight="bold"
          >
            {t("account_details", {
              role: variant === "company" ? t("company") : t("account"),
            })}
          </Typography>
        </div>
        <CardAbout
          data={data}
          variant={variant}
        />
        <CardAccountDetails
          data={data}
          variant={variant}
        />
        <ModalForbidden
          isOpen={modalForbidden}
          onClose={() => setModalForbidden(false)}
          title="Edit on Mobile"
          subtitle="Sorry, you can't edit on mobile."
          variant={variant}
        />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-6">
          <div className="_flexbox__row__center__between w-full">
            <Typography
              variant="h5"
              weight="bold"
            >
              {t("account_details", {
                role: variant === "company" ? t("company") : t("account"),
              })}
            </Typography>
            <Button
              variant={`tertiary-${variant}`}
              prefixIcon={<FilePenLine />}
              onClick={() => handleClickEdit(true)}
            >
              {t("button_edit_account", {
                role: variant === "company" ? t("company") : t("account"),
              })}
            </Button>
          </div>
          <CardAbout
            data={data}
            variant={variant}
          />
          <CardAccountDetails
            data={data}
            variant={variant}
          />
        </div>
      </Desktop>
    </>
  );
};
export default Details;
