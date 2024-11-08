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
        <AddCollaborators id={id} onClose={onCloseModal} />
      </div>
    </BaseModal>
  );
};
