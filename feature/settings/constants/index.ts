import { SortFilterType } from "@/types/admin/dashboard";
import { Role } from "@/types/admin/sidebar";

export const hackerSettingTabItems: SortFilterType[] = [
  {
    label: "Hacker Details",
    value: "details",
  },
  {
    label: "Billings",
    value: "billings",
  },
  {
    label: "Notifications",
    value: "notifications",
  },
  {
    label: "Security",
    value: "security",
  },
  {
    label: "Data & Privacy",
    value: "data_privacy",
  },
];

export const mediatorSettingTabItems: SortFilterType[] = [
  {
    label: "Mediator Details",
    value: "details",
  },
  {
    label: "Notifications",
    value: "notifications",
  },
  {
    label: "Security",
    value: "security",
  },
  {
    label: "Data & Privacy",
    value: "data_privacy",
  },
];
export const companySettingTabItems: SortFilterType[] = [
  {
    label: "Company Details",
    value: "details",
  },
  {
    label: "Notifications",
    value: "notifications",
  },
  {
    label: "Security",
    value: "security",
  },
  {
    label: "Data & Privacy",
    value: "data_privacy",
  },
];

export const companyStaffSettingTabItems: SortFilterType[] = [
  {
    label: "Notifications",
    value: "notifications",
  },
  {
    label: "Security",
    value: "security",
  },
  {
    label: "Data & Privacy",
    value: "data_privacy",
  },
];

export const settingTabItems: { [key in Role]: SortFilterType[] } = {
  [Role.hacker]: hackerSettingTabItems,
  [Role.mediator]: mediatorSettingTabItems,
  [Role.company]: companySettingTabItems,
  [Role["company staff"]]: companyStaffSettingTabItems,
};
