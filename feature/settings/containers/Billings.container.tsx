"use client";
import { Button, Typography } from "@/core/ui/components";
import { FilePenLine } from "lucide-react";
import CardBilling from "../component/_tabs/_contents/billings/CardBilling";
import { useState } from "react";
import CardEditBilling from "../component/_tabs/_contents/billings/CardEditBilling";

const Billing = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  return (
    <>
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          Billings
        </Typography>
        {!isEdit && (
          <Button
            variant="tertiary-hacker"
            prefixIcon={<FilePenLine />}
            onClick={() => setIsEdit(true)}
          >
            Edit billings setting
          </Button>
        )}
      </div>
      {isEdit ? (
        <CardEditBilling onClickDiscard={() => setIsEdit(false)} />
      ) : (
        <CardBilling />
      )}
    </>
  );
};
export default Billing;
