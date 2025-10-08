"use client";
import { cn } from "@/core/lib/utils";
import { BaseModal, Button, Input, Typography } from "@/core/ui/components";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface I_ModalDeleteStaffProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  handleDeleteStaff: () => void;
  isLoading?: boolean;
}

const ModalDeleteStaff = ({
  isOpen,
  onClose,
  name,
  handleDeleteStaff,
  isLoading = false,
}: I_ModalDeleteStaffProps) => {
  const t = useTranslations("ManageCompany.CompanyStaff.delete_staff.modal");
  const [staffName, setStaffName] = useState<string>("");
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className={cn(
          "relative mx-auto w-fit max-w-[602px] rounded-lg p-20",
          "_flexbox__col__start__start gap-12",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__center w-full gap-6">
          <Button
            variant="tertiary-company"
            prefixIcon={<X />}
            className="absolute right-2 top-2"
            onClick={() => {
              onClose();
            }}
          />
          <Typography
            variant="h5"
            weight="bold"
          >
            {t("title")}
          </Typography>
          <Typography
            variant="p"
            affects="normal"
            className="mt-2"
            align={"center"}
          >
            {t.rich("description", {
              strong: () => <strong className="select-none">{name}</strong>,
            })}
          </Typography>
        </div>
        <Input
          value={staffName}
          aria-label="Delete Staff"
          id="delete_staff"
          type="text"
          onChange={(e) => setStaffName(e.target.value)}
          isError={staffName !== name}
        />
        <div className="flex w-full items-center gap-6">
          <Button
            variant="alert"
            disabled={staffName !== name || isLoading}
            isLoading={isLoading}
            fullWidth
            onClick={handleDeleteStaff}
          >
            {t("button_delete")}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalDeleteStaff;
