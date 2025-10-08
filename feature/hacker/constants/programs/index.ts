import { I_TableColumns } from "@/interfaces";
import { SortFilterType } from "@/types/admin/dashboard";
import {
  CsvssCalculatorType,
  ProgramCardType,
  ProgramDetailScope,
  SendReportStepsType,
  UpdateType,
} from "@/types/admin/programs";
import { useTranslations } from "next-intl";

export const programsCardData: ProgramCardType[] = [
  {
    company_id: "abc_123456",
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
    company_id: "xyz_987654",
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
    company_id: "pqr_234567",
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
    company_id: "lmn_345678",
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
    company_id: "efg_456789",
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
    company_id: "rst_567890",
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
    company_id: "uvw_678901",
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
    company_id: "hij_789012",
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
    company_id: "mno_890123",
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
    company_id: "jkl_901234",
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

export const useGetTableColumns = () => {
  const t = useTranslations("Programs");
  const tableColumns: I_TableColumns[] = [
    {
      title: t("program_name"),
      align: "left",
      width: "w-3/12",
    },
    {
      title: t("program_title"),
      align: "left",
      width: "w-2/12",
    },
    {
      title: t("asset_type"),
      align: "left",
      width: "w-5/12",
    },
    {
      title: t("bounty"),
      align: "left",
      width: "w-2/12",
    },
  ];

  return tableColumns;
};

export const tableColumns: I_TableColumns[] = [
  {
    title: "Program Name",
    align: "left",
    width: "w-3/12",
  },
  {
    title: "Program Title",
    align: "left",
    width: "w-2/12",
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
];

export const useGetScopeTableColumns = () => {
  const t = useTranslations("ProgramDetailsHacker.scope");

  return [
    {
      title: t("asset_name"),
      align: "left",
      width: "w-4/12",
    },
    {
      title: t("type"),
      align: "center",
      width: "w-4/12",
    },
    {
      title: t("update"),
      align: "left",
      width: "w-4/12",
    },
  ] as I_TableColumns[];
};

export const scopeTableColumns: I_TableColumns[] = [
  {
    title: "Asset Name",
    align: "left",
    width: "w-4/12",
  },
  {
    title: "Type",
    align: "center",
    width: "w-4/12",
  },
  {
    title: "Update",
    align: "left",
    width: "w-4/12",
  },
];

export const useGetProgramDetailsTabItems = () => {
  const t = useTranslations("ProgramDetailsHacker.tabs");

  return [
    {
      label: t("summary"),
      value: "summary",
    },
    {
      label: t("rules_and_policy"),
      value: "rules",
    },
    {
      label: t("bounty"),
      value: "bounty",
    },
    {
      label: t("scope"),
      value: "scope",
    },
    {
      label: t("updates"),
      value: "updates",
    },
    {
      label: t("thanks"),
      value: "thanks",
    },
  ];
};

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
    value: "updates",
  },
  // {
  //   label: "Thanks",
  //   value: "thanks",
  // },
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

export const programDetailScope: ProgramDetailScope[] = [
  {
    asset_name: "https://example1.com",
    asset_type: "url",
    update: "2024-02-28T12:00:00.000Z",
  },
  {
    asset_name: "https://example2.com",
    asset_type: "iot",
    update: "2024-02-27T09:30:00.000Z",
  },
  {
    asset_name: "https://example3.com",
    asset_type: "android",
    update: "2024-02-26T15:45:00.000Z",
  },
  {
    asset_name: "https://example4.com",
    asset_type: "ios",
    update: "2024-02-25T18:20:00.000Z",
  },
  {
    asset_name: "https://example5.com",
    asset_type: "url",
    update: "2024-02-28T12:00:00.000Z",
  },
  {
    asset_name: "https://example6.com",
    asset_type: "iot",
    update: "2024-02-27T09:30:00.000Z",
  },
  {
    asset_name: "https://example7.com",
    asset_type: "android",
    update: "2024-02-26T15:45:00.000Z",
  },
  {
    asset_name: "https://example8.com",
    asset_type: "ios",
    update: "2024-02-25T18:20:00.000Z",
  },
  {
    asset_name: "https://example9.com",
    asset_type: "url",
    update: "2024-02-28T12:00:00.000Z",
  },
  {
    asset_name: "https://example10.com",
    asset_type: "iot",
    update: "2024-02-27T09:30:00.000Z",
  },
];

export const updates: UpdateType[] = [
  {
    title: "New Campaign!",
    created_at: "2024-02-24T12:00:00.000Z",
    content:
      "<p>We are pleased to inform you that we have launched our next campaign for 3 weeks! We will be glad to see your new reports, this time we included 2 products in the campaign: <strong>Coinbase vulnerabilities</strong>.</p><br><p>We look forward to your impactful reports!</p>",
  },
  {
    title: "New Opportunities!",
    created_at: "2024-02-22T12:00:00.000Z",
    content: `<p>Hello dear hackers!</p> <br><p>We would like to inform you that we have recently had releases in the "Krisha" product, we would like to draw your attention to new sections:</p><br><ul><li><a href="https://krisha.kz/prodazha/doma-dachi/">https://krisha.kz/prodazha/doma-dachi/</a></li><li><a href="https://krisha.kz/prodazha/garazhi/">https://krisha.kz/prodazha/garazhi/</a></li><li><a href="https://krisha.kz/arenda/garazhi/">https://krisha.kz/arenda/garazhi/</a></li></ul><br><p>Generally, in the future we plan to publish new releases in the changelog section.</p>
    `,
  },
];

export const useGetInformations = () => {
  const t = useTranslations("SendReportHacker.information");

  return [
    {
      label: t("brief.label"),
      description: null,
      value: 1,
    },
    {
      label: t("bug_target.label"),
      description: t("bug_target.description"),
      value: 2,
    },
    {
      label: t("report_description.label"),
      description: t("report_description.description"),
      value: 3,
    },
    {
      label: t("problem_causes.label"),
      description: t("problem_causes.description"),
      value: 4,
    },
    {
      label: t("review.label"),
      description: null,
      value: 5,
    },
  ] as SendReportStepsType[];
};

export const informations: SendReportStepsType[] = [
  {
    label: "Brief",
    description: null,
    value: 1,
  },
  {
    label: "Bug Target",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. ",
    value: 2,
  },
  {
    label: "Report Description",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. ",
    value: 3,
  },
  {
    label: "Problem and Causes",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. ",
    value: 4,
  },
  {
    label: "Review",
    description: null,
    value: 5,
  },
];

export const csvss_calculator: CsvssCalculatorType[] = [
  {
    title: "Attack Vector (AV)",
    key: "av",
    items: [
      {
        label: "Network (N)",
        value: "N",
      },
      {
        label: "Adjacent (A)",
        value: "A",
      },
      {
        label: "Local (L)",
        value: "L",
      },
      {
        label: "Physical (P)",
        value: "P",
      },
    ],
  },
  {
    title: "Scope (S)",
    key: "s",
    items: [
      {
        label: "Unchanged (U)",
        value: "U",
      },
      {
        label: "Changed (C)",
        value: "C",
      },
    ],
  },
  {
    title: "Attack Complexity (AC)",
    key: "ac",
    items: [
      {
        label: "Low (L)",
        value: "L",
      },
      {
        label: "High (H)",
        value: "H",
      },
    ],
  },
  {
    title: "Confidentiality (C)",
    key: "c",
    items: [
      {
        label: "None (N)",
        value: "N",
      },
      {
        label: "Low (L)",
        value: "L",
      },
      {
        label: "High (H)",
        value: "H",
      },
    ],
  },
  {
    title: "Privileges Required (PR)",
    key: "pr",
    items: [
      {
        label: "None (N)",
        value: "N",
      },
      {
        label: "Low (L)",
        value: "L",
      },
      {
        label: "High (H)",
        value: "H",
      },
    ],
  },
  {
    title: "Integrity (I)",
    key: "i",
    items: [
      {
        label: "None (N)",
        value: "N",
      },
      {
        label: "Low (L)",
        value: "L",
      },
      {
        label: "High (H)",
        value: "H",
      },
    ],
  },
  {
    title: "User Interaction (UI)",
    key: "ui",
    items: [
      {
        label: "None (N)",
        value: "N",
      },
      {
        label: "Required (R)",
        value: "R",
      },
    ],
  },
  {
    title: "Availability (A)",
    key: "a",
    items: [
      {
        label: "None (N)",
        value: "N",
      },
      {
        label: "Low (L)",
        value: "L",
      },
      {
        label: "High (H)",
        value: "H",
      },
    ],
  },
];
