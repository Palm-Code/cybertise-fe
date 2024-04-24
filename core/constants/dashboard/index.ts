import { SortFilterType } from "@/types/admin/dashboard";
import { OptionsType } from "@/types/auth/sign-up";

export const filterItems: SortFilterType[] = [
  {
    label: "Latest update",
    value: "-updated_at",
  },
  {
    label: "Oldest",
    value: "created_at",
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
  {
    label: "Grid View",
    value: "grid",
    icon: "/icons/card.svg",
  },
];
