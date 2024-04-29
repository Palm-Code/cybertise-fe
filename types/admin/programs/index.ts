import {
  AttackComplexity,
  AttackVector,
  Availability,
  Confidentiality,
  Integrity,
  PrivilegesRequired,
  Scope,
  UserInteraction,
} from "@/enums";

export type ProgramCardType = {
  company_id: string;
  logo: string;
  company_name: string;
  domain: "public" | "private";
  min_bounty: number;
  max_bounty: number;
  asset_type: {
    label: string;
    value: "url" | "iot" | "android" | "ios";
  }[];
  currency: "USD" | "EUR" | "GBP";
};

export type ProgramDetailScope = {
  asset_name: string;
  asset_type: "url" | "iot" | "android" | "ios";
  update: string;
};

export type UpdateType = {
  title: string;
  created_at: string;
  content: string;
};

export type CsvssCalculatorType = {
  title: string;
  key: string;
  items: {
    label: string;
    value: string;
  }[];
};

export type SendReportStepsType = {
  label: string;
  value: number;
  description: string | null;
};

export type MetricValues = {
  av: AttackVector;
  ac: AttackComplexity;
  pr: PrivilegesRequired;
  ui: UserInteraction;
  s: Scope;
  c: Confidentiality;
  i: Integrity;
  a: Availability;
};
