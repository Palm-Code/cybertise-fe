import { HTMLAttributes } from "react";

export interface I_Icons extends HTMLAttributes<SVGElement> {}

export interface I_TableColumns {
  title: string;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface I_TableTicketData {
  company_name: string;
  logo: string;
  date_reported: string;
  domain: "public" | "private";
  risk_level: "low" | "medium" | "high";
  vulnerability_type: string;
  rewards: number;
  status: string;
  update: string;
}
