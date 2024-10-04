import { I_TableColumns, I_TableReportTicketData } from "@/interfaces";
import { useTranslations } from "next-intl";

export const useGetTableColumns = () => {
  const t = useTranslations("Ticket");
  const tableColumns: I_TableColumns[] = [
    {
      title: t("ticket"),
      align: "left",
      width: "w-3/12",
    },
    {
      title: t("risk_level"),
      align: "center",
      width: "w-2/12",
    },
    {
      title: t("last_message"),
      align: "left",
      width: "w-3/12",
    },
    {
      title: t("status"),
      align: "left",
      width: "w-2/12",
    },
    {
      title: t("last_update"),
      align: "center",
      width: "w-1/12",
    },
  ];
  return tableColumns;
};

export const tableColumns: I_TableColumns[] = [
  {
    title: "Ticket",
    align: "left",
    width: "w-3/12",
  },
  {
    title: "Risk Level",
    align: "center",
    width: "w-2/12",
  },
  {
    title: "Last Message",
    align: "left",
    width: "w-3/12",
  },
  {
    title: "Status",
    align: "left",
    width: "w-2/12",
  },
  {
    title: "Last Update",
    align: "center",
    width: "w-1/12",
  },
];

export const tableTicketData: I_TableReportTicketData[] = [
  {
    ticket_number: "TCKT001",
    company_name: "Company A",
    title: "Security Vulnerability",
    description: "Critical security vulnerability detected in the system.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "high",
    status: "Open",
    update: "2024-03-07 09:00:00",
    is_new_notification: true,
  },
  {
    ticket_number: "TCKT002",
    company_name: "Company B",
    title: "Data Breach",
    description: "Sensitive data breach detected. Investigation ongoing.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "high",
    status: "In Progress",
    update: "2024-03-07 10:15:00",
    is_new_notification: false,
  },
  {
    ticket_number: "TCKT003",
    company_name: "Company C",
    title: "System Outage",
    description: "Critical system outage affecting production services.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "medium",
    status: "Open",
    update: "2024-03-07 11:30:00",
    is_new_notification: true,
  },
  {
    ticket_number: "TCKT004",
    company_name: "Company D",
    title: "Performance Degradation",
    description:
      "Performance degradation observed in application response times.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "low",
    status: "Closed",
    update: "2024-03-07 12:45:00",
    is_new_notification: false,
  },
  {
    ticket_number: "TCKT005",
    company_name: "Company E",
    title: "Potential Security Threat",
    description: "Suspicious activity detected, possible security threat.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "medium",
    status: "In Progress",
    update: "2024-03-07 14:00:00",
    is_new_notification: true,
  },
  {
    ticket_number: "TCKT006",
    company_name: "Company F",
    title: "Data Loss",
    description: "Loss of critical data reported.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "high",
    status: "Open",
    update: "2024-03-07 15:15:00",
    is_new_notification: true,
  },
  {
    ticket_number: "TCKT007",
    company_name: "Company G",
    title: "Application Bug",
    description: "Critical bug discovered in the application logic.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "medium",
    status: "In Progress",
    update: "2024-03-07 16:30:00",
    is_new_notification: false,
  },
  {
    ticket_number: "TCKT008",
    company_name: "Company H",
    title: "Service Unavailability",
    description: "Service currently unavailable due to server failure.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "high",
    status: "Open",
    update: "2024-03-07 17:45:00",
    is_new_notification: true,
  },
  {
    ticket_number: "TCKT009",
    company_name: "Company I",
    title: "Network Issue",
    description: "Network connectivity issue reported by users.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "low",
    status: "Closed",
    update: "2024-03-07 19:00:00",
    is_new_notification: false,
  },
  {
    ticket_number: "TCKT010",
    company_name: "Company J",
    title: "Application Update",
    description: "Planned application update scheduled for maintenance.",
    logo: "/images/company-logo/coinbase.png",
    risk_level: "low",
    status: "Scheduled",
    update: "2024-03-07 20:15:00",
    is_new_notification: true,
  },
];
