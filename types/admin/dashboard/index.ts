export type SortFilterType = {
  label: string;
  value: string | number;
};

export type MultiFilterType = {
  risk_level: SortFilterType[];
  type: SortFilterType[];
  status: SortFilterType[];
  asset_type: SortFilterType[];
};
