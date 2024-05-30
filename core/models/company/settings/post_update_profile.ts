import { z } from "zod";

export const updatePorfileSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }).optional(),
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email is required" }),
  website: z.string().min(1, { message: "Website is required" }),
  country_code: z.string().min(1, { message: "Country code is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  address_2: z.string().optional(),
  city: z.string().min(1, { message: "City is required" }),
  state: z.string().min(1, { message: "State is required" }),
  zip: z.string().min(1, { message: "Zip is required" }),
  phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
      message: "Invalid phone number format",
    }),
  about: z.string().min(1, { message: "About is required" }),
  want_news: z.number(),
  logo: z.string().optional(),
  attachment_id: z.string().optional(),
  bank_name: z.string().optional(),
  account_number: z.string().optional(),
  holder_name: z.string().optional(),
  vat: z.string().optional(),
  iban: z.string().optional(),
  bic: z.string().optional(),
});

export const updateEmergencyContactSchema = z.object({
  emergency_contact_person: z.string().min(1, { message: "Name is required" }),
  emergency_email: z.string().email({ message: "Email is required" }),
  emergency_phone: z
    .string()
    .min(1, { message: "Phone is required" })
    .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
      message: "Invalid phone number format",
    }),
});

export type I_UpdateProfile = z.infer<typeof updatePorfileSchema>;

export type I_UpdateEmergencyContact = z.infer<
  typeof updateEmergencyContactSchema
>;
