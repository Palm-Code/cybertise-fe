export interface I_GetActivityParamsRequestPayload {
  payload?: I_GetActivityParamsRequest;
}
export interface I_GetActivityParamsRequest {
  params?: {
    page_size?: number;
    page?: number;
    timezone?: string;
    date_start?: string;
    date_finish?: string;
    sort?: string;
  };
}

export interface I_GetActivityListSuccessResponse {
  data?: Data;
  meta?: Meta;
}

interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

interface Data {
  [key: string]: I_Activities[];
}

interface I_Activities {
  id: number;
  log_name: string;
  description: string;
  subject_type: string;
  subject_id: string;
  causer_type: null | string;
  causer_id: null | string;
  event: string;
  properties: Properties;
  batch_uuid: null;
  created_at: string;
  updated_at: string;
  causer: any;
  subject: any;
}

interface Properties {
  old?: any;
  attributes: any;
}
