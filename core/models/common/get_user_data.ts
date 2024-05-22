import { I_Company } from "./get_included_data";

export interface I_UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  company: I_Company;
}

export interface I_GetUserDataSuccessResponse {
  data: I_UserData;
}
