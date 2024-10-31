"use client";
import { AnimationWrapper } from "@/core/ui/layout";
import VrpCardList from "../../_card/VrpCard";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import { useState } from "react";
import { CollaboratorDialog } from "../../_dialogs";
import { useQueryClient } from "@tanstack/react-query";
import { ModalForbidden } from "@/core/ui/container";
import {
  initialState,
  useCollaboratorsParamsStore,
} from "@/feature/mediator/zustand/store/companies/collaborators";
import { useHackersParamsStore } from "@/feature/mediator/zustand/store/companies/hackers";

const Collaborators = ({
  data,
}: {
  data: I_GetProgramListSuccessResponse["data"];
}) => {
  const queryClient = useQueryClient();
  const { setPayload } = useCollaboratorsParamsStore();
  const { setPayload: setHackerPayload } = useHackersParamsStore();
  const [selectedId, setSelectedId] = useState<string>("");
  const [openCollaboratorDialog, setOpenCollaboratorDialog] = useState(false);
  const [openModalConfirm, setOpenModalConfirm] = useState(false);

  const onCloseCollaboratorDialog = () => {
    // setOpenModalConfirm(true);
    setOpenCollaboratorDialog(false);
    queryClient.removeQueries();
    setHackerPayload(initialState.payload);
    setPayload(initialState.payload);
  };

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
        onClose={onCloseCollaboratorDialog}
      />
      <ModalForbidden
        isOpen={openModalConfirm}
        onClose={() => setOpenModalConfirm(false)}
      />
    </>
  );
};
export default Collaborators;
