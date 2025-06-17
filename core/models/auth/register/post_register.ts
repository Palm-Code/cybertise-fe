import { websiteRegex } from "@/utils/formatter/regex";
import { z } from "zod";

export const signupHackerFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  country_code: z.string().min(1, { message: "Country is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  device_type: z.string().min(1, { message: "Device type is required" }),
});
export const signupCompanyFormSchema = z.object({
  name: z.string().min(1, { message: "Corporate Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  country_code: z.string().min(1, { message: "Country is required" }),
  website: z
    .string()
    .min(1, { message: "Corporate Website is required" })
    .regex(websiteRegex, { message: "Invalid website format" }),
  state: z.string().min(1, { message: "State is required" }),
  city: z.string().min(1, { message: "City is required" }),
  zip: z.string().min(1, { message: "Zip Code is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  address_2: z.string().optional(),
  device_type: z.string().min(1, { message: "Device type is required" }),
});

export type SignupHackerFormType = z.infer<typeof signupHackerFormSchema>;
export type SignupCompanyFormType = z.infer<typeof signupCompanyFormSchema>;
