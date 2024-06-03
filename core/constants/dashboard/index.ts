import { SortFilterType } from "@/types/admin/dashboard";
import { OptionsType } from "@/types/auth/sign-up";

export const filterItems: SortFilterType[] = [
  {
    label: "Latest update",
    value: "-updated_at",
  },
  {
    label: "Oldest",
    value: "updated_at",
  },
];
export const filterSortBy: {
  [key in "timestamp" | "alphabetical"]: SortFilterType[];
} = {
  timestamp: [
    {
      label: "Latest update",
      value: "-updated_at",
    },
    {
      label: "Oldest",
      value: "updated_at",
    },
  ],
  alphabetical: [
    {
      label: "A-Z",
      value: "name",
    },
    {
      label: "Z-A",
      value: "-name",
    },
  ],
};

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
