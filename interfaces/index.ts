import { HTMLAttributes } from "react";

export interface I_Icons extends HTMLAttributes<SVGElement> {}

export interface I_TableColumns {
  title: string;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface I_TableTicketData {
  ticket_number: string;
  title: string;
  logo: string;
  date_reported: string;
  domain: "public" | "private";
  risk_level: "low" | "medium" | "high";
  vulnerability_type: string;
  rewards: number;
  status: string;
  update: string;
  is_new_notification: boolean;
}
export interface I_TableReportTicketData {
  ticket_number: string;
  company_name: string;
  title: string;
  description: string;
  logo: string;
  risk_level: "low" | "medium" | "high";
  status: string;
  update: string;
  is_new_notification: boolean;
}

export interface FileWithUrl {
  name: string;
  url: string;
  uuid?: string;
  size: number;
  mime_type?: string;
  file_id?: string;
  error?: boolean;
}
