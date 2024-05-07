"use client";
import { cn } from "@/core/lib/utils";
import { BaseModal, Button, Input, Typography } from "@/core/ui/components";
import { X } from "lucide-react";
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
  const [staffName, setStaffName] = useState<string>("");
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
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
          <Typography variant="h5" weight="bold">
            Delete Staff
          </Typography>
          <Typography
            variant="p"
            affects="normal"
            className="mt-2"
            align={"center"}
          >
            To Confirm, Type <strong className="select-none">"{name}"</strong>{" "}
            to delete in the box below
          </Typography>
        </div>
        <Input
          value={staffName}
          aria-label="Delete Staff"
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
            Delete this staff
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalDeleteStaff;
