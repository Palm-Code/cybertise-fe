import { I_TableColumns } from "@/interfaces";
import { SortFilterType } from "@/types/admin/dashboard";
import { UpdateType } from "@/types/admin/programs";

export const vrpData = [
  {
    id: "vrp_1",
    asset_type: [
      {
        label: "URL",
        value: "url",
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
    name: "VRP Title 1",
    status: "Phase 2: Setup Phase",
  },
  {
    id: "vrp_2",
    asset_type: [
      {
        label: "URL",
        value: "url",
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
    name: "VRP Title 2",
    status: "Phase 3: Company Revision",
  },
];

export const scopeTableColumns: I_TableColumns[] = [
  {
    title: "Asset Name",
    align: "left",
    width: "w-4/12",
  },
  {
    title: "Type",
    align: "left",
    width: "w-4/12",
  },
  {
    title: "Update",
    align: "left",
    width: "w-4/12",
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
    value: "updates",
  },
  {
    label: "Thanks",
    value: "thanks",
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
