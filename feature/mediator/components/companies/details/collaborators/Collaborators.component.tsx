"use client";
import React from "react";
import { ViewCollaborators } from "../_dialogs/_content";

interface I_CollaboratorsProps {
  id: string;
}

export const Collaborators = ({ id }: I_CollaboratorsProps) => {
  return (
    <ViewCollaborators
      id={id}
      onClickAddCollaborator={() => {}}
    />
  );
};
