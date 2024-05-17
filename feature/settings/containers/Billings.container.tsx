"use client";
import { Button, Card, Typography } from "@/core/ui/components";
import { FilePenLine, X } from "lucide-react";
import CardBilling from "../component/_tabs/_contents/billings/CardBilling";
import CardEditBilling from "../component/_tabs/_contents/billings/CardEditBilling";
import { Desktop, Mobile } from "@/core/ui/layout";
import { cn } from "@/core/lib/utils";
import { Role } from "@/types/admin/sidebar";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { useFormContext } from "react-hook-form";
import { I_UpdateProfile } from "@/core/models/company/settings";
import { useState } from "react";
import { ModalForbidden } from "@/core/ui/container";
import { toast } from "sonner";
import { usePostUpdateProfile } from "@/core/react-query/client";

interface I_BillingProps {
  variant: keyof typeof Role;
  isEditing?: boolean;
  handleClickEdit?: (v: boolean) => void;
  data?: I_GetUserProfileSuccessResponse["data"];
}

const Billing = ({
  variant,
  isEditing = false,
  data,
  handleClickEdit = () => {},
}: I_BillingProps) => {
  const { mutateAsync, isPending, isSuccess } = usePostUpdateProfile(true);
  const [openModalForbidden, setOpenModalForbidden] = useState<boolean>(false);
  const {
    getValues,
    formState: { errors },
  } = useFormContext<I_UpdateProfile>();

  const handleSubmitForm = () => {
    if (Object.values(errors).length === 0) {
      mutateAsync(getValues()).then(() => {
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
          <div className="_flexbox__col__start__start gap-6">
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
                <Typography variant="h5" weight="bold" className="capitalize">
                  Edit Billing Informations
                </Typography>
              </div>
              <div className="_flexbox__row__center__start gap-6">
                <Button
                  variant={`tertiary-${variant}`}
                  onClick={() => handleClickEdit(false)}
                >
                  Discard
                </Button>
                <Button
                  isLoading={isPending}
                  disabled={isPending}
                  variant={`primary-${variant}`}
                  onClick={() => handleSubmitForm()}
                >
                  Save Changes
                </Button>
              </div>
            </Card>
            <CardEditBilling data={data} variant={variant} />
          </div>
        </Desktop>
      </>
    );

  return (
    <>
      <Mobile className="space-y-6">
        <div className="_flexbox__row__center__between w-full">
          <Typography variant="h5" weight="bold">
            Billings
          </Typography>
          {!isEditing && (
            <Button
              variant={`tertiary-${variant}`}
              className="p-0"
              prefixIcon={<FilePenLine />}
              onClick={() => setOpenModalForbidden(true)}
            />
          )}
        </div>
        <CardBilling data={data} />
        <ModalForbidden
          isOpen={openModalForbidden}
          onClose={() => setOpenModalForbidden(false)}
          title="Edit Setting"
          subtitle="You are not allowed to edit this setting on mobile"
        />
      </Mobile>
      <Desktop className="space-y-6">
        <div className="_flexbox__row__center__between w-full">
          <Typography variant="h5" weight="bold">
            Billings
          </Typography>
          {!isEditing && (
            <Button
              variant={`tertiary-${variant}`}
              prefixIcon={<FilePenLine />}
              onClick={() => handleClickEdit(true)}
            >
              Edit billings setting
            </Button>
          )}
        </div>
        <CardBilling data={data} />
      </Desktop>
    </>
  );
};
export default Billing;
