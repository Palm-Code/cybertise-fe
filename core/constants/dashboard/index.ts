import { SortFilterType } from "@/types/admin/dashboard";
import { OptionsType } from "@/types/auth/sign-up";

export const filterItems: SortFilterType[] = [
  {
    label: "Latest update",
    value: "latest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
];

export const filterView: OptionsType[] = [
  {
    label: "Card View",
    value: "card",
    icon: "/icons/card.svg",
  },
  {
    label: "Table View",
    value: "table",
    icon: "/icons/card.svg",
  },
];
