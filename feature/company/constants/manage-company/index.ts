import { SortFilterType } from "@/types/admin/dashboard";
import { useTranslations } from "next-intl";

export const useManageCompanyTabsItem = () => {
  const t = useTranslations("ManageCompany");

  const manageCompanyTabsItem: SortFilterType[] = [
    {
      label: t("tabs.company_details"),
      value: "company_details",
    },
    {
      label: t("tabs.staffs"),
      value: "staffs",
    },
    {
      label: t("tabs.emergency_contact"),
      value: "emergency_contact",
    },
    {
      label: t("tabs.activity_logs"),
      value: "activity_logs",
    },
  ];

  return manageCompanyTabsItem;
};

export const manageCompanyTabsItem: SortFilterType[] = [
  {
    label: "Company Details",
    value: "company_details",
  },
  {
    label: "Staffs",
    value: "staffs",
  },
  {
    label: "Emergency Contact",
    value: "emergency_contact",
  },
  {
    label: "Activity Logs",
    value: "activity_logs",
  },
];
