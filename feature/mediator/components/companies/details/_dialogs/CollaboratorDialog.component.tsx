import { cn } from "@/core/lib/utils";
import BaseModal, { I_ModalProps } from "@/core/ui/components/modal/modal";
import React, { useState } from "react";
import { ViewCollaborators } from "./_content";
import { AddCollaborators } from "./_content/AddCollaborators.component";

type CollaboratorDialogProps = I_ModalProps & {
  id: string;
};

export const CollaboratorDialog = ({
  id,
  ...props
}: CollaboratorDialogProps) => {
  const [openAddCollaborator, setOpenAddCollaborator] = useState(false);
  return (
    <BaseModal {...props}>
      <div className="container h-screen w-full py-20">
        <div
          className={cn(
            "h-full w-full rounded-2xl bg-background-main-light dark:bg-background-main-dark",
            "px-10 py-8"
          )}
        >
          {openAddCollaborator ? (
            <AddCollaborators id={id} onClose={props.onClose} />
          ) : (
            <ViewCollaborators
              id={id}
              onClose={props.onClose}
              onClickAddCollaborator={() => setOpenAddCollaborator(true)}
            />
          )}
        </div>
      </div>
    </BaseModal>
  );
};
