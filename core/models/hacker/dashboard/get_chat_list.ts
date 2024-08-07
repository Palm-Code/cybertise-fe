import { I_Company, I_Meta, I_Program } from "../../common/get_included_data";

interface I_VulnerabilityType {
  id: string;
  value: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  label: string;
}

export enum ChatFilter {
  level = "level",
  status = "status",
  "program.type" = "program.type",
}

export interface I_GetChatListSuccessResponse {
  data: {
    id: string;
    code: string;
    title: string;
    description: string;
    risk_level: number;
    cvss_string: string | null;
    ticket_type: "Hacker" | "Company";
    related_ticket_id: string | null;
    vulnerability_type_id: string;
    status: string;
    bounty: any;
    program_id: string;
    has_new: number;
    has_new_mediator: number;
    risk_level_category: string;
    last_message: string;
    vulnerabiity_type: I_VulnerabilityType;
    program?: I_Program;
    company?: I_Company;
    created_at: string;
    updated_at: string;
  }[];
  meta?: I_Meta;
}
