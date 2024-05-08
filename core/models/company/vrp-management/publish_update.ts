import { z } from "zod";

export const updateFormSchema = z.object({
  program_id: z.string().min(1, { message: "Program id is required" }),
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

export type UpdateFormRequestType = z.infer<typeof updateFormSchema>;
