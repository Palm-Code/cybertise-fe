import { SortFilterType } from "@/types/admin/dashboard";
import { Role } from "@/types/admin/sidebar";
import { useTranslations } from "next-intl";

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

export const useHackerSettingTabItems = (): SortFilterType[] => {
  const t = useTranslations("Settings.tabs");
  return [
    {
      label: t("details", {
        role: "Hacker",
      }),
      value: "details",
    },
    {
      label: t("billings"),
      value: "billings",
    },
    {
      label: t("notifications"),
      value: "notifications",
    },
    {
      label: t("security"),
      value: "security",
    },
    {
      label: t("data_privacy"),
      value: "data_privacy",
    },
  ];
};

export const useMediatorSettingTabItems = (): SortFilterType[] => {
  const t = useTranslations("Settings.tabs");
  return [
    {
      label: t("details", {
        role: "Mediator",
      }),
      value: "details",
    },
    {
      label: t("notifications"),
      value: "notifications",
    },
    {
      label: t("security"),
      value: "security",
    },
    {
      label: t("data_privacy"),
      value: "data_privacy",
    },
  ];
};

export const useCompanySettingTabItems = (): SortFilterType[] => {
  const t = useTranslations("Settings.tabs");
  return [
    {
      label: t("details", {
        role: "Company",
      }),
      value: "details",
    },
    {
      label: t("notifications"),
      value: "notifications",
    },
    {
      label: t("security"),
      value: "security",
    },
    {
      label: t("data_privacy"),
      value: "data_privacy",
    },
  ];
};

export const useCompanyStaffSettingTabItems = (): SortFilterType[] => {
  const t = useTranslations("Settings.tabs");
  return [
    {
      label: t("details", {
        role: "Company",
      }),
      value: "details",
    },
    {
      label: t("notifications"),
      value: "notifications",
    },
    {
      label: t("security"),
      value: "security",
    },
    {
      label: t("data_privacy"),
      value: "data_privacy",
    },
  ];
};

export const settingTabItems: { [key in Role]: SortFilterType[] } = {
  [Role.hacker]: hackerSettingTabItems,
  [Role.mediator]: mediatorSettingTabItems,
  [Role.company]: companySettingTabItems,
  [Role["company staff"]]: companyStaffSettingTabItems,
};
