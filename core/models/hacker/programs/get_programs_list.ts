import { NextApiRequest } from "next";

export interface I_GetProgramListRequest extends NextApiRequest {
  payload?: I_GetProgramListPayload;
}

export interface I_GetProgramListPayload {
  params?: I_GetProgramListParamsRequest;
}

export interface I_AssetType {
  id: string;
  value: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  label: string;
}

export interface I_TargetAsset {
  id: string;
  program_id: string;
  company_id: string;
  asset_type_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  asset_type_name: string;
  asset_type: I_AssetType;
}

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
}

export interface I_GetProgramListSuccessResponse {
  data: {
    id: string;
    title: string;
    status: string;
    monetary_awards_level: string;
    monetary_awards_high: number;
    monetary_awards_medium: number;
    monetary_awards_low: number;
    company_id: string;
    type: string;
    asset_types?: I_AssetType[];
    target_assets?: I_TargetAsset[];
    company?: I_Company;
  }[];
}

enum Filter {
  has_asset_type = "has_asset_type",
  type = "type",
  company_id = "company_id",
  "programs.status" = "programs.status",
}

export interface I_GetProgramListParamsRequest {
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
    [key in Filter]?: string;
  };
}

export interface I_GetErrorResponse {
  message: string;
  documentation: string;
}
