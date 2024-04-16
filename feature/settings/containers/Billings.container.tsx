"use client";
import { Button, Card, Typography } from "@/core/ui/components";
import { FilePenLine, X } from "lucide-react";
import CardBilling from "../component/_tabs/_contents/billings/CardBilling";
import CardEditBilling from "../component/_tabs/_contents/billings/CardEditBilling";
import { Desktop, Mobile } from "@/core/ui/layout";
import { cn } from "@/core/lib/utils";

interface I_BillingProps {
  variant: "hacker" | "mediator" | "company";
  isEditing?: boolean;
  handleClickEdit?: (v: boolean) => void;
}

const Billing = ({
  variant,
  isEditing = false,
  handleClickEdit = () => {},
}: I_BillingProps) => {
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
                <Button variant={`primary-${variant}`} onClick={() => {}}>
                  Save Changes
                </Button>
              </div>
            </Card>
            <CardEditBilling variant={variant} />
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
              onClick={() => handleClickEdit(true)}
            />
          )}
        </div>
        <CardBilling />
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
        <CardBilling />
      </Desktop>
    </>
  );
};
export default Billing;
