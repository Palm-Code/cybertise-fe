import { Role } from "@/types/admin/sidebar";

export interface I_GetAccessTokenPayload {
  code: string;
  device_type?: string;
  totp?: string;
}

export interface I_GetAccessTokenResponse {
  message: string;
  role?: keyof typeof Role;
  "access-token": string;
  language: string;
}

export interface I_GetAccessTokenSuccessResponse {
  data: I_GetAccessTokenResponse;
}
