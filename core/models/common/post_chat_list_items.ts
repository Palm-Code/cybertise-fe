import { z } from "zod";

export interface I_PostChatListItemsPayload {
  chat_ticket_id: string;
  sender: string;
  sender_name?: string;
  content: string;
  attachments?: string[];
}

export const chatListItemSchema = z.object({
  chat_ticket_id: z.string(),
  sender_avatar: z.string(),
  sender_name: z.string().optional(),
  content: z.string(),
  attachments: z.array(z.string()).optional(),
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
});

export type PostChatListRequestType = z.infer<typeof chatListItemSchema>;
