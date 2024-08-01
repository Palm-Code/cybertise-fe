import { z } from "zod";

export const createCompanyStaffSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .max(25, {
      message: "Phone is too long",
    })
    .regex(/^\d{1,25}$/, {
      message: "Invalid phone number format",
    }),
});

export type I_StaffRequestType = z.infer<typeof createCompanyStaffSchema>;

interface I_Staff {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface I_GetStaffSuccessResponse {
  data: I_Staff[];
}
