"use client";
import { AnimationWrapper } from "@/core/ui/layout";
import VrpCardList from "../../_card/VrpCard";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import { useState } from "react";
import { CollaboratorDialog } from "../../_dialogs";

const Collaborators = ({
  data,
}: {
  data: I_GetProgramListSuccessResponse["data"];
}) => {
  const [selectedId, setSelectedId] = useState<string>("");
  const [openCollaboratorDialog, setOpenCollaboratorDialog] = useState(false);

  return (
    <>
      <AnimationWrapper>
        <VrpCardList
          isCollaborators
          data={data ?? []}
          onClickVrp={(v) => {
            setSelectedId(v);
            setOpenCollaboratorDialog(true);
          }}
        />
      </AnimationWrapper>
      <CollaboratorDialog
        id={selectedId}
        isOpen={openCollaboratorDialog}
        onClose={() => setOpenCollaboratorDialog(false)}
      />
    </>
  );
};
export default Collaborators;
