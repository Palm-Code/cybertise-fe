export type VRPCardType = {
  company_id: string;
  logo: string;
  company_name: string;
  domain: "public" | "private";
  asset_type: {
    label: string;
    value: "url" | "iot" | "android" | "ios" | "hardware" | "windows";
  }[];
  status: "active" | "inactive";
};
