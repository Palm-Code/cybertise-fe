import { z } from "zod";

export interface I_PostSendReportRequest {
  payload: {
    title: string;
    description: string;
    impact: string;
    poc: string;
    target_asset_id: string;
    vulnerability_type_id: string;
    risk_level: number;
    ticket_type: string;
    program_id?: string;
    attachment?: string[];
    custom_ta_asset_type_id?: string;
    custom_ta_value?: string;
  };
}

export const sendReportFormSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is required",
    })
    .min(1, { message: "Title is required" }),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description is required",
    })
    .min(1, { message: "Description is required" }),
  impact: z.string().min(1, { message: "Impact is required" }),
  poc: z.string().min(1, { message: "POC is required" }),
  target_asset_id: z
    .string({
      required_error: "Target asset is required",
      invalid_type_error: "Target asset is required",
    })
    .min(1, { message: "Target asset is required" })
    .optional(),
  vulnerabiity_type_id: z
    .string({
      required_error: "Vulnerability type is required",
      invalid_type_error: "Vulnerability type is required",
    })
    .min(1, { message: "Vulnerability type is required" }),
  risk_level: z
    .number({
      required_error: "Risk level is required",
      invalid_type_error: "Risk level is required",
    })
    .min(1, { message: "Risk level is required" }),
  ticket_type: z.string().min(1, { message: "Ticket type is required" }),
  program_id: z.string().optional(),
  attachments: z.array(z.string()).optional(),
  custom_ta_asset_type_id: z.string().optional(),
  custom_ta_value: z.string().optional(),
  files: z
    .array(
      z.object({
        name: z.string(),
        url: z.string(),
        size: z.number(),
        file_id: z.string().optional(),
        error: z.boolean().optional(),
      })
    )
    .optional(),
  cvss_string: z.string().optional(),
});

export type SendReportRequestType = z.infer<typeof sendReportFormSchema>;
