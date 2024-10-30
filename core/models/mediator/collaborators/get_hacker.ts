import { I_Meta, I_UserData } from "../../common";

export interface I_GetHackerSuccessResponse {
  data: I_UserData & {
    valid_report: number;
    last_active: string | null;
    asset_types: string[];
  };
  meta: I_Meta;
}
