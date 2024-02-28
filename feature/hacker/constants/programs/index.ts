import { I_TableColumns } from "@/interfaces";
import { SortFilterType } from "@/types/admin/dashboard";
import { ProgramCardType } from "@/types/admin/programs";

export const programsCardData: ProgramCardType[] = [
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "ABC Corp",
    domain: "public",
    min_bounty: 100,
    max_bounty: 500,
    asset_type: [
      {
        label: "URL",
        value: "url",
      },
      {
        label: "Hardware/Iot",
        value: "iot",
      },
      {
        label: "Android: PlayStore",
        value: "android",
      },
      {
        label: "iOS: AppStore",
        value: "ios",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "XYZ Ltd",
    domain: "private",
    min_bounty: 200,
    max_bounty: 1000,
    asset_type: [
      {
        label: "Hardware/Iot",
        value: "iot",
      },
      {
        label: "URL",
        value: "url",
      },
      {
        label: "Android: PlayStore",
        value: "android",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "PQR Inc",
    domain: "public",
    min_bounty: 50,
    max_bounty: 300,
    asset_type: [
      {
        label: "URL",
        value: "url",
      },
      {
        label: "iOS: AppStore",
        value: "ios",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "LMN Enterprises",
    domain: "private",
    min_bounty: 150,
    max_bounty: 800,
    asset_type: [
      {
        label: "Hardware/Iot",
        value: "iot",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "EFG Corporation",
    domain: "public",
    min_bounty: 80,
    max_bounty: 400,
    asset_type: [
      {
        label: "URL",
        value: "url",
      },
      {
        label: "Hardware/Iot",
        value: "iot",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "RST Technologies",
    domain: "private",
    min_bounty: 120,
    max_bounty: 600,
    asset_type: [
      {
        label: "Android: PlayStore",
        value: "android",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "UVW Innovations",
    domain: "public",
    min_bounty: 70,
    max_bounty: 350,
    asset_type: [
      {
        label: "URL",
        value: "url",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "HIJ Solutions",
    domain: "private",
    min_bounty: 180,
    max_bounty: 900,
    asset_type: [
      {
        label: "URL",
        value: "url",
      },
      {
        label: "iOS: AppStore",
        value: "ios",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "MNO Technologies",
    domain: "public",
    min_bounty: 60,
    max_bounty: 250,
    asset_type: [
      {
        label: "Hardware/Iot",
        value: "iot",
      },
      {
        label: "Android: PlayStore",
        value: "android",
      },
    ],
    currency: "USD",
  },
  {
    logo: "/images/company-logo/coinbase.png",
    company_name: "JKL Systems",
    domain: "private",
    min_bounty: 250,
    max_bounty: 1200,
    asset_type: [
      {
        label: "iOS: AppStore",
        value: "ios",
      },
    ],
    currency: "USD",
  },
];

export const tableColumns: I_TableColumns[] = [
  {
    title: "Company Name",
    align: "left",
    width: "w-3/12",
  },
  {
    title: "Asset Type",
    align: "left",
    width: "w-5/12",
  },
  {
    title: "Bounty",
    align: "left",
    width: "w-2/12",
  },
  {
    title: "",
    align: "right",
    width: "w-2/12 ml-auto",
  },
];

export const programDetailTabItems: SortFilterType[] = [
  {
    label: "Rules & Policy",
    value: "rules",
  },
  {
    label: "Scope",
    value: "scope",
  },
  {
    label: "Updates",
    value: "update",
  },
  {
    label: "Thanks",
    value: "thanks",
  },
];

export const programDetailTabMultipleItems: SortFilterType[] = [
  {
    label: "Vulnerability Program",
    value: "vulnerability",
  },
  {
    label: "Thanks",
    value: "thanks",
  },
];
