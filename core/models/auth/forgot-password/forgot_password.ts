import { z } from "zod";

export interface I_GetForgotPasswordRequest {
  code: string;
  new_password: string;
  logout_all: 0 | 1;
}

export const formResetPasswordShcema = z.object({
  old_password: z.string().min(1, { message: "Old password is required" }),
  new_password: z.string().min(1, { message: "New password is required" }),
  logout_all: z.number(),
  is_match: z.boolean().optional(),
  isValidated: z.boolean().optional(),
});

export type I_GetResetPasswordRequest = z.infer<typeof formResetPasswordShcema>;
