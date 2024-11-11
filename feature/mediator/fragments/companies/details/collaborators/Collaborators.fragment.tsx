import { Collaborators } from "@/feature/mediator/components/companies/details/collaborators";
import React from "react";

export const CollaboratorsFragment = ({ id }: { id: string }) => {
  return <Collaborators id={id} />;
};
