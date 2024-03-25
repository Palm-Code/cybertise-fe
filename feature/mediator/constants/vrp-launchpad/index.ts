import { I_TableColumns } from "@/interfaces";
import { SortFilterType } from "@/types/admin/dashboard";
import {
  CollaboratorCardDataType,
  VRPCardType,
  VRPCompaniesCardType,
} from "@/types/admin/vrp-launchpad";

export const tableColumns: I_TableColumns[] = [
  {
    title: "Company Name",
    align: "left",
    width: "w-3/12",
  },
  {
    title: "VRP Type",
    align: "center",
    width: "w-2/12",
  },
  {
    title: "Asset Type",
    align: "left",
    width: "w-5/12",
  },
  {
    title: "Status",
    align: "left",
    width: "w-2/12",
  },
];
export const companiesTableColumns: I_TableColumns[] = [
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
    title: "Status",
    align: "left",
    width: "w-2/12",
  },
];

export const companyTabsItem: SortFilterType[] = [
  {
    label: "Vulnerability Program",
    value: "vulnerability_program",
  },
  {
    label: "Active Tickets",
    value: "active_tickets",
  },
  {
    label: "Thanks",
    value: "thanks",
  },
  {
    label: "Collaborators",
    value: "collaborators",
  },
  {
    label: "Activity Logs",
    value: "activity_logs",
  },
];

export const vrpCardsData: VRPCardType[] = [
  {
    company_id: "COMP_12345",
    logo: "/images/company-logo/coinbase.png",
    company_name: "Acme Inc.",
    domain: "public",
    asset_type: [
      { label: "Mobile App", value: "android" },
      { label: "Website", value: "url" },
      { label: "Backend API", value: "url" }, // Added another record
    ],
    status: "active",
  },
  {
    company_id: "COMP_67890",
    logo: "/images/company-logo/coinbase.png",
    company_name: "Technovation Solutions",
    domain: "private",
    asset_type: [{ label: "VR Device", value: "hardware" }],
    status: "inactive",
  },
  {
    company_id: "COMP_23456",
    logo: "/images/company-logo/coinbase.png",
    company_name: "Green Tech",
    domain: "public",
    asset_type: [
      { label: "IoT Sensor", value: "iot" },
      { label: "Desktop Application", value: "windows" },
    ],
    status: "active",
  },
  {
    company_id: "COMP_78901",
    logo: "/images/company-logo/coinbase.png",
    company_name: "Skynet Systems",
    domain: "private",
    asset_type: [{ label: "AI Assistant", value: "iot" }],
    status: "active",
  },
  {
    company_id: "COMP_34567",
    logo: "/images/company-logo/coinbase.png",
    company_name: "SolarCity Inc.",
    domain: "public",
    asset_type: [{ label: "Monitoring System", value: "iot" }],
    status: "active",
  },
  {
    company_id: "COMP_90123",
    logo: "/images/company-logo/coinbase.png",
    company_name: "Automata Inc.",
    domain: "private",
    asset_type: [
      { label: "Delivery Drone", value: "hardware" },
      { label: "Control Software", value: "windows" },
    ],
    status: "inactive",
  },
  {
    company_id: "COMP_56789",
    logo: "/images/company-logo/coinbase.png",
    company_name: "Bloggers United",
    domain: "public",
    asset_type: [{ label: "Website", value: "url" }],
    status: "active",
  },
  {
    company_id: "COMP_01234",
    logo: "/images/company-logo/coinbase.png",
    company_name: "Fitness Trackers Inc.",
    domain: "public",
    asset_type: [{ label: "Mobile App", value: "android" }],
    status: "active",
  },
  {
    company_id: "COMP_89012",
    logo: "/images/company-logo/coinbase.png",
    company_name: "AgriTech Solutions",
    domain: "private",
    asset_type: [{ label: "Smart Irrigation System", value: "iot" }],
    status: "active",
  },
  {
    company_id: "COMP_45678",
    logo: "/images/company-logo/coinbase.png",
    company_name: "FinTech Innovations",
    domain: "public",
    asset_type: [
      { label: "Mobile App", value: "ios" },
      { label: "Cloud Platform", value: "url" }, // Added another record
    ],
    status: "active",
  },
];

export const vrpCompaniesCardsData: VRPCompaniesCardType[] = [
  {
    id: "EX-001",
    title: "EX-001 - Example Corp",
    asset_type: [
      { label: "Mobile App", value: "android" },
      { label: "Website", value: "url" },
      { label: "Backend API", value: "url" }, // Added another record
    ],
    status: "active",
  },
  {
    id: "EX-002",
    title: "EX-002 - Another Corp",
    asset_type: [{ label: "VR Device", value: "hardware" }],
    status: "inactive",
  },
];

export const collaboratorTableColums: I_TableColumns[] = [
  {
    title: "Hacker Name",
    align: "left",
    width: "w-1/2",
  },
  {
    title: "Location",
    align: "center",
    width: "w-1/2",
  },
];

export const collaboratorCardData: CollaboratorCardDataType[] = [
  {
    name: "Kevin",
    location: "USA",
  },
  {
    name: "Giga",
    location: "Canada",
  },
  {
    name: "Tantri",
    location: "Canada",
  },
  {
    name: "Junianto",
    location: "Canada",
  },
  {
    name: "Rizky",
    location: "Canada",
  },
];
