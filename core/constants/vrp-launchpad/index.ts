import { MonetaryAwardType, PricingProps } from "@/types/admin/vrp-launchpad";

export const vrpInformations = {
  vrp_details: [
    {
      label: "Review VRP Details",
      value: 1,
    },
    {
      label: "Make Changes",
      value: 2,
    },
    {
      label: "Notes",
      value: 3,
    },
    {
      label: "Review",
      value: 4,
    },
  ],
};

export const monetarySData: PricingProps[] = [
  {
    tier: "Tier I",
    list: [
      {
        label: "Low",
        value: 200,
      },
      {
        label: "Medium",
        value: 200,
      },
      {
        label: "High",
        value: 200,
      },
      {
        label: "Critical",
        value: 200,
      },
    ],
    checked: false,
  },
  {
    tier: "Tier II",
    list: [
      {
        label: "Low",
        value: 200,
      },
      {
        label: "Medium",
        value: 200,
      },
      {
        label: "High",
        value: 200,
      },
      {
        label: "Critical",
        value: 200,
      },
    ],
    checked: false,
  },
  {
    tier: "Tier III",
    list: [
      {
        label: "Low",
        value: 200,
      },
      {
        label: "Medium",
        value: 200,
      },
      {
        label: "High",
        value: 200,
      },
      {
        label: "Critical",
        value: 200,
      },
    ],
    checked: false,
  },
];

export const monetaryAwardData: MonetaryAwardType[] = [
  {
    title: "Category S",
    category: "S",
    priceData: monetarySData,
  },
  {
    title: "Category M",
    category: "M",
    priceData: monetarySData,
  },
  {
    title: "Category L",
    category: "L",
    priceData: monetarySData,
  },
  {
    title: "Category XL",
    category: "XL",
    priceData: monetarySData,
  },
];
