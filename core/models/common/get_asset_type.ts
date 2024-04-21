export interface I_GetAssetTypeSuccessResponse {
  data: {
    id: string;
    value: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    label: string;
  }[];
}
