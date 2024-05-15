import { NextApiRequest } from "next";

export interface I_Company {
  id: string;
  user_id: string;
  thanks_message: string;
  report_resolved: number;
  program_count: number;
  status: string;
  auth_company_profiles_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  name: string;
  website: string;
  highest_bounty: number;
  lowest_bounty: number;
  description: string;
  rules: string;
  logo: string;
  media: string[];
}

export interface I_Program {
  id: string;
  title: string;
  monetary_awards_level: string;
  monetary_awards_high: number;
  monetary_awards_medium: number;
  monetary_awards_low: number;
  company_id: string;
  rules: string;
  type: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  policies: string;
  published_at: string;
  published_date: string;
  published_time: string;
}

export interface I_Meta {
  current_page: number;
  from: number | null;
  last_page: number;
  path: string;
  per_page: number | null;
  to: number | null;
  total: number | null;
}

export interface I_GetParamsListRequest extends NextApiRequest {
  payload?: I_GetParamsPayload;
}

export interface I_GetParamsPayload {
  params?: I_GetParamsRequest;
}

export interface I_GetParamsRequest {
  sort?: string;
  search?: string;
  fields?: {
    [key: string]: string;
  };
  include?: string;
  page?: {
    size: number;
    number: number;
  };
  append?: string;
  filter?: {
    [key: string]: string | undefined;
  };
}
