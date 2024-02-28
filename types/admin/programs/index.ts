export type ProgramCardType = {
  logo: string;
  company_name: string;
  domain: "public" | "private";
  min_bounty: number;
  max_bounty: number;
  asset_type: Array<
    "URL" | "Hardware/Iot" | "Android:PlayStore" | "iOS:AppStore"
  >;
  currency: "USD" | "EUR" | "GBP";
};
