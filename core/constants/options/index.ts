import { OptionsType } from "@/types/auth/sign-up";

import { SortFilterType } from "@/types/admin/dashboard";

export const collaboratorSortBy: SortFilterType[] = [
  {
    label: "A-Z",
    value: "user.name",
  },
  {
    label: "Z-A",
    value: "-user.name",
  },
  {
    label: "Last Active",
    value: "-user.last_active",
  },
  {
    label: "Valid Report",
    value: "-user.valid_report",
  },
];
export const hackerSortBy: SortFilterType[] = [
  {
    label: "A-Z",
    value: "name",
  },
  {
    label: "Z-A",
    value: "-name",
  },
  {
    label: "Last Active",
    value: "-last_active",
  },
  {
    label: "First Active",
    value: "last_active",
  },
  {
    label: "Valid Report",
    value: "-valid_report",
  },
];

export const ticketReportedOptions: OptionsType[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "1-5",
    value: "small",
  },
  {
    label: "6-10",
    value: "medium",
  },
  {
    label: "11-15",
    value: "large",
  },
  {
    label: "16+",
    value: "extra_large",
  },
];
