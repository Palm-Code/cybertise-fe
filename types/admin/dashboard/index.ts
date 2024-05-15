export type SortFilterType = {
  id?: string;
  label: string;
  value: string | number;
};

export type MultiFilterType = {
  risk_level: SortFilterType[];
  type: SortFilterType[];
  status: SortFilterType[];
  asset_type: SortFilterType[];
  company_status?: SortFilterType[];
};
