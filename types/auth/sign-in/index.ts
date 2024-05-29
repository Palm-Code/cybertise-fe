import { Role } from "@/types/admin/sidebar";

export type FormLoginSchema = {
  email: string;
  password: string;
  device_type: string;
};

export type FormAuthorizeSchema = {
  role: keyof typeof Role;
  "access-token": string;
};
