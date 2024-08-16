import { I_Meta } from "./get_included_data";

interface I_ChatTicket {
  id: string;
  chat_ticket_id?: string;
  code: string;
  title: string;
  description: string;
  impact: string;
  poc: string;
  user_id: string;
  company_id: string;
  company_name: string;
  program_id: string;
  related_ticket_id: string | null;
  target_asset_id: string;
  vulnerabiity_type_id: string;
  custom_vulnerability: string;
  risk_level: number;
  ticket_type: string;
  status: string;
  has_new: number;
  custom_ta_value: any;
  custom_ta_asset_type_id: any;
  bounty: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  risk_level_category: string;
  last_message: string;
  user: {
    id: string;
    name: string;
    email: string;
    email_verified_at: string | null;
    role: string;
    created_at: string;
    updated_at: string;
  };
}

export interface I_Media {
  id: number;
  model_type: string;
  model_id: string;
  uuid: string;
  collection_name: string;
  name: string;
  file_name: string;
  mime_type: string;
  disk: string;
  conversions_disk: string;
  size: number;
  manipulations: any[];
  custom_properties: any[];
  generated_conversions: any[];
  responsive_images: any[];
  order_column: number;
  created_at: string;
  updated_at: string;
  original_url: string;
  preview_url: string;
}

export interface I_Data {
  id?: string;
  chat_ticket_id: string;
  sender?: string;
  content?: string;
  badge?: number;
  status_badge?: string;
  has_link?: boolean;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  sender_name?: string;
  files?: string[];
  sender_avatar?: string;
  chat_ticket?: I_ChatTicket;
  attachments?: string[];
  media?: I_Media[];
}

export interface I_GetChatListItemSuccessResponse {
  data: I_Data[];
  meta?: I_Meta;
}
