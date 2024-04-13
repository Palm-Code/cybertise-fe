"use client";
import { Button, Typography } from "@/core/ui/components";
import { FilePenLine } from "lucide-react";
import CardBilling from "../component/_tabs/_contents/billings/CardBilling";
import { useState } from "react";
import CardEditBilling from "../component/_tabs/_contents/billings/CardEditBilling";
import { Desktop, Mobile } from "@/core/ui/layout";

interface I_BillingProps {
  variant: "hacker" | "mediator" | "company";
}

const Billing = ({ variant }: I_BillingProps) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      <Mobile className="space-y-6">
        <div className="_flexbox__row__center__between w-full">
          <Typography variant="h5" weight="bold">
            Billings
          </Typography>
          {!isEdit && (
            <Button
              variant={`tertiary-${variant}`}
              className="p-0"
              prefixIcon={<FilePenLine />}
              onClick={() => setIsEdit(true)}
            ></Button>
          )}
        </div>
        {isEdit ? (
          <CardEditBilling
            variant={variant}
            onClickDiscard={() => setIsEdit(false)}
          />
        ) : (
          <CardBilling />
        )}
      </Mobile>
      <Desktop className="space-y-6">
        <div className="_flexbox__row__center__between w-full">
          <Typography variant="h5" weight="bold">
            Billings
          </Typography>
          {!isEdit && (
            <Button
              variant={`tertiary-${variant}`}
              prefixIcon={<FilePenLine />}
              onClick={() => setIsEdit(true)}
            >
              Edit billings setting
            </Button>
          )}
        </div>
        {isEdit ? (
          <CardEditBilling
            variant={variant}
            onClickDiscard={() => setIsEdit(false)}
          />
        ) : (
          <CardBilling />
        )}
      </Desktop>
    </>
  );
};
export default Billing;
