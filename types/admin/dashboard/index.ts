export type SortFilterType = {
  label: string;
  value: string;
};

export type MultiFilterType = {
  risk_level: SortFilterType[];
  type: SortFilterType[];
  status: SortFilterType[];
};
