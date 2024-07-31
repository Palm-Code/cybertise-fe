import { z } from "zod";

export const formLoginShcema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormLoginSchema = z.infer<typeof formLoginShcema>;

export interface I_GetLoginResponse {
  message: string;
  email?: string;
  deactivated_at?: Date;
  destroyed_at?: Date;
  "two-factor": boolean;
  session_code: string;
}

export interface I_GetLoginSuccessResponse {
  data: I_GetLoginResponse;
}
