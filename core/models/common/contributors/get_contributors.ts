import { I_GetAssetTypeSuccessResponse, I_Meta, I_UserData } from "..";

export interface I_GetContributorsSuccessResponse {
  data: I_GetContributorsResponse[];
  meta: I_Meta;
}

interface I_GetContributorsResponse {
  user_id?: string;
  program_id?: string;
  id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  user: I_UserData & {
    valid_report: number;
    last_active: string | null;
    asset_types: I_GetAssetTypeSuccessResponse["data"];
  };
}
