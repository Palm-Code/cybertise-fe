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
    "attachment[0]"?: string;
    "attachment[1]"?: string;
    custom_ta_asset_type_id?: string;
    custom_ta_value?: string;
  };
}

export const sendReportFormSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  impact: z.string().min(1, { message: "Impact is required" }),
  poc: z.string().min(1, { message: "POC is required" }),
  target_asset_id: z
    .string()
    .min(1, { message: "Target asset is required" })
    .optional(),
  vulnerability_type_id: z
    .string()
    .min(1, { message: "Vulnerability type is required" }),
  risk_level: z.number().min(1, { message: "Risk level is required" }),
  ticket_type: z.string().min(1, { message: "Ticket type is required" }),
  program_id: z.string().optional(),
  "attachment[0]": z.string().optional(),
  "attachment[1]": z.string().optional(),
  custom_ta_asset_type_id: z.string().optional(),
  custom_ta_value: z.string().optional(),
});

export type SendReportRequestType = z.infer<typeof sendReportFormSchema>;
