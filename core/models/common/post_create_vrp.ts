import { z } from "zod";

interface I_Data {
  title: string;
  description: string;
  monetary_awards_critical: string;
  monetary_awards_high: string;
  monetary_awards_medium: string;
  monetary_awards_low: string;
  rules: string;
  monetary_awards_level: string;
  type: string;
  status: string;
  company_id: string;
  id: string;
  updated_at: string;
  created_at: string;
}

export interface I_GetCreateVrpListSuccessResponse {
  data: I_Data;
}

export const createVrpSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  monetary_awards_critical: z
    .number()
    .min(1, { message: "Monetary Awards Critical is required" }),
  monetary_awards_high: z
    .number()
    .min(1, { message: "Monetary Awards High is required" }),
  monetary_awards_medium: z
    .number()
    .min(1, { message: "Monetary Awards Medium is required" }),
  monetary_awards_low: z
    .number()
    .min(1, { message: "Monetary Awards Low is required" }),
  rules: z.string().min(1, { message: "Rules is required" }).optional(),
  policies: z.string().min(1, { message: "Policies is required" }).optional(),
  monetary_awards_level: z
    .string()
    .min(1, { message: "Monetary Awards Level is required" }),
  target_assets: z.array(
    z.object({
      content: z.string().min(1, { message: "Content is required" }),
      asset_type_id: z.string().min(1, { message: "Asset type is required" }),
    })
  ),
  asset_types_values: z.array(
    z.object({
      id: z.string().min(1, { message: "Asset type is required" }),
      value: z.string().min(1, { message: "Value is required" }),
      label: z.string().min(1, { message: "Label is required" }),
    })
  ),
  type: z.string().min(1, { message: "Type is required" }),
  notes: z.string().min(1, { message: "Notes is required" }),
});

export type CreateVrpType = z.infer<typeof createVrpSchema>;
