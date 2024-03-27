import { MonetaryAwardType, PricingProps } from "@/types/admin/vrp-launchpad";

export const vrpInformations = {
  vrp_details: [
    {
      label: "Brief",
      value: 1,
    },
    {
      label: "VRP Details",
      value: 2,
    },
    {
      label: "Setup Monetary Awards",
      value: 3,
    },
    {
      label: "Setup Initial Scope",
      value: 4,
    },
    {
      label: "Notes",
      value: 5,
    },
    {
      label: "Review",
      value: 6,
    },
  ],
  setup_phase: [
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
  company_revision: [
    {
      label: "Notes",
      value: 1,
    },
    {
      label: "VRP Details",
      value: 2,
    },
    {
      label: "Monetary Awards",
      value: 3,
    },
    {
      label: "Scope",
      value: 4,
    },
    {
      label: "Rules & Policies",
      value: 5,
    },
    {
      label: "Notes",
      value: 6,
    },
    {
      label: "Review",
      value: 7,
    },
  ],
  mediator_revision: [
    {
      label: "Review VRP Details",
      value: 1,
    },
    {
      label: "Setup Monetary Awards",
      value: 2,
    },
    {
      label: "Setup Initial Scope",
      value: 3,
    },
    {
      label: "Notes",
      value: 4,
    },
    {
      label: "Review",
      value: 5,
    },
  ],
  publish: [
    {
      label: "VRP Details",
      value: 1,
    },

    {
      label: "Rules & Policies",
      value: 2,
    },
    {
      label: "Monetary Awards",
      value: 3,
    },
    {
      label: "Scope",
      value: 4,
    },
    {
      label: "Notes",
      value: 5,
    },
    {
      label: "Review",
      value: 6,
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
