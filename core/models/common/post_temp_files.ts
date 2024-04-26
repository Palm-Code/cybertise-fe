import { I_Media } from "./get_chat_list_item";

export interface I_PostTempFilesRequest {
  file: File[];
  content: string;
}

export interface I_PostTempFilesResponse {
  data: {
    user_id: string;
    id: string;
    file: string;
    created_at: string;
    updated_at: string;
    media: I_Media[];
  };
}
