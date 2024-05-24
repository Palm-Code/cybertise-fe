import { Role } from "@/types/admin/sidebar";

export interface I_GetAccessTokenPayload {
  code: string;
}

export interface I_GetAccessTokenResponse {
  message: string;
  role?: keyof typeof Role;
  "access-token": string;
}

export interface I_GetAccessTokenSuccessResponse {
  data: I_GetAccessTokenResponse;
}
