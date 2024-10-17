import { I_Meta } from "../../common";

export interface I_GetCollaboratorSuccessResponse {
  data: I_GetCollaboratorResponse[];
  meta: I_Meta;
}

interface I_GetCollaboratorResponse {
  user_id: string;
  program_id: string;
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}
