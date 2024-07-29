import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ChevronRight, ShieldX } from "lucide-react";
import ModalDeactivateAccount from "../../../_dialogs/deactivate-account/ModalDeactivateAcccount";
import { useState } from "react";
import { Role } from "@/types/admin/sidebar";

interface I_CardDeactivateAccountProps {
  variant?: keyof typeof Role;
}

const CardDeactivateAccount = ({ variant }: I_CardDeactivateAccountProps) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Card
        isButton
        className={cn(
          "_flexbox__col__start__start w-full gap-3 rounded-xl px-4 py-8 xl:p-7.5",
          "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
        )}
        onClick={() => setOpenModal(true)}
      >
        <div className="_flexbox__row__start__between w-full">
          <Typography variant="h6" weight="bold" className="xl:inline-flex">
            <ShieldX className="mb-4 mr-4 h-8 w-8 xl:mb-0" />
            Deactivate your account
          </Typography>
          <ChevronRight className="hidden xl:block" />
        </div>
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Find out how you can deactivate your account
        </Typography>
      </Card>
      <ModalDeactivateAccount
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        variant={variant}
      />
    </>
  );
};
export default CardDeactivateAccount;
