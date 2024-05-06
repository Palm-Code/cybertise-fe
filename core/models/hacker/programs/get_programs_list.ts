import { I_Company, I_Meta } from "../../common/get_included_data";

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

export interface I_LatestUpdates {
  id: string;
  program_id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface I_Note {
  id: string;
  content: string;
}

export interface I_GetProgramListSuccessResponse {
  data: {
    id: string;
    title: string;
    status: string;
    description?: string;
    monetary_awards_level: string;
    monetary_awards_high: number;
    monetary_awards_medium: number;
    monetary_awards_low: number;
    monetary_awards_critical: number;
    rules: string;
    company_id: string;
    type: string;
    asset_types?: I_AssetType[];
    target_assets?: I_TargetAsset[];
    company?: I_Company;
    latest_updates?: I_LatestUpdates[];
    notes?: I_Note;
  }[];
  meta?: I_Meta;
}

export interface I_GetErrorResponse {
  message: string;
  documentation: string;
}
