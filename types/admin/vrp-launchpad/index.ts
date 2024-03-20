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

export type PricingProps = {
  tier: string;
  list: {
    label: string;
    value: number;
  }[];
  checked: boolean;
};

export type MonetaryAwardType = {
  title: string;
  category: "S" | "M" | "L" | "XL";
  priceData: PricingProps[];
};
