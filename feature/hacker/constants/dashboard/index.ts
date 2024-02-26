import { I_TableColumns, I_TableTicketData } from "@/interfaces";
import { MultiFilterType } from "@/types/admin/dashboard";

export const tableColumns: I_TableColumns[] = [
  {
    title: "Ticket",
    align: "left",
    width: "w-[20%]",
  },
  {
    title: "Risk Level",
    align: "left",
    width: "w-[80px]",
  },
  {
    title: "Vulnerability type (CWE)",
    align: "left",
    width: "w-[220px]",
  },
  {
    title: "Rewards",
    align: "left",
    width: "w-[80px]",
  },
  {
    title: "Status",
    align: "left",
    width: "w-[120px]",
  },
  {
    title: "Update",
    align: "center",
    width: "w-[80px]",
  },
];

export const tableTicketData: I_TableTicketData[] = [
  {
    company_name: "Example Corp",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-26",
    domain: "public",
    risk_level: "medium",
    vulnerability_type: "SQL Injection",
    rewards: 1000,
    status: "Open",
    update: "2024-02-26T08:30:00", // Assuming the update time is 08:30:00 for example
  },
  {
    company_name: "Private Co.",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-25",
    domain: "private",
    risk_level: "high",
    vulnerability_type: "Cross-site Scripting (XSS)",
    rewards: 2500,
    status: "Closed",
    update: "2024-02-25T15:45:00", // Assuming the update time is 15:45:00 for example
  },
  {
    company_name: "Test Ltd.",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-24",
    domain: "public",
    risk_level: "low",
    vulnerability_type: "Broken Authentication",
    rewards: 500,
    status: "Open",
    update: "2024-02-24T10:20:00", // Assuming the update time is 10:20:00 for example
  },
  {
    company_name: "Example Corp",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-26",
    domain: "public",
    risk_level: "medium",
    vulnerability_type: "SQL Injection",
    rewards: 1000,
    status: "Open",
    update: "2024-02-26T08:30:00", // Assuming the update time is 08:30:00 for example
  },
  {
    company_name: "Private Co.",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-25",
    domain: "private",
    risk_level: "high",
    vulnerability_type: "Cross-site Scripting (XSS)",
    rewards: 2500,
    status: "Closed",
    update: "2024-02-25T15:45:00", // Assuming the update time is 15:45:00 for example
  },
  {
    company_name: "Test Ltd.",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-24",
    domain: "public",
    risk_level: "low",
    vulnerability_type: "Broken Authentication",
    rewards: 500,
    status: "Open",
    update: "2024-02-24T10:20:00", // Assuming the update time is 10:20:00 for example
  },
  {
    company_name: "Example Corp",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-26",
    domain: "public",
    risk_level: "medium",
    vulnerability_type: "SQL Injection",
    rewards: 1000,
    status: "Open",
    update: "2024-02-26T08:30:00", // Assuming the update time is 08:30:00 for example
  },
  {
    company_name: "Private Co.",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-25",
    domain: "private",
    risk_level: "high",
    vulnerability_type: "Cross-site Scripting (XSS)",
    rewards: 2500,
    status: "Closed",
    update: "2024-02-25T15:45:00", // Assuming the update time is 15:45:00 for example
  },
  {
    company_name: "Test Ltd.",
    logo: "/images/company-logo/coinbase.png",
    date_reported: "2024-02-24",
    domain: "public",
    risk_level: "low",
    vulnerability_type: "Broken Authentication",
    rewards: 500,
    status: "Open",
    update: "2024-02-26T20:20:00", // Assuming the update time is 10:20:00 for example
  },
  // Add more entries here...
];

export const filterItems: MultiFilterType = {
  risk_level: [
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ],
  type: [
    { label: "Public", value: "public" },
    { label: "Private", value: "private" },
  ],
  status: [
    { label: "Open", value: "open" },
    { label: "Closed", value: "closed" },
  ],
};
