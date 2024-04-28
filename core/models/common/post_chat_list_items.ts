export interface I_PostChatListItemsPayload {
  chat_ticket_id: string;
  sender: string;
  sender_name?: string;
  content: string;
  attachments?: string[];
}
