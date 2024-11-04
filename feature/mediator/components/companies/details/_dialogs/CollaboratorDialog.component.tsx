import { cn } from "@/core/lib/utils";
import BaseModal, { I_ModalProps } from "@/core/ui/components/modal/modal";
import React from "react";
import { AddCollaborators } from "./_content/AddCollaborators.component";
import { useQueryClient } from "@tanstack/react-query";

type CollaboratorDialogProps = I_ModalProps & {
  id: string;
};

export const CollaboratorDialog = ({
  id,
  onClose = () => {},
  ...props
}: CollaboratorDialogProps) => {
  const queryClient = useQueryClient();
  const onCloseModal = () => {
    queryClient.removeQueries({
      queryKey: ["getHackerList"],
    });
    onClose();
  };

  return (
    <BaseModal {...props}>
      <div className="container h-screen w-full py-20">
        <div
          className={cn(
            "h-full w-full rounded-2xl bg-background-main-light dark:bg-background-main-dark",
            "px-10 py-8"
          )}
        >
          <AddCollaborators id={id} onClose={onCloseModal} />
        </div>
      </div>
    </BaseModal>
  );
};
