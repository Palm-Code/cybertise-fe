export type ProgramCardType = {
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
