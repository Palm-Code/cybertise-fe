import { Role } from "@/types/admin/sidebar";
import { I_Company } from "./get_included_data";

export interface I_UserData {
  id: string;
  name: string;
  email: string;
  role: keyof typeof Role;
  avatar?: string;
  company?: I_Company;
  language: string;
}

export interface I_GetUserDataSuccessResponse {
  data: I_UserData;
}
