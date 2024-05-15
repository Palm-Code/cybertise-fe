import { Role } from "../sidebar";

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

export type VRPCompaniesCardType = {
  id: string;
  title: string;
  asset_type: {
    label: string;
    value: "url" | "iot" | "android" | "ios" | "hardware" | "windows";
  }[];
  status: "active" | "inactive";
};

export type PricingProps = {
  tier: string;
  category: string;
  list: {
    label: string;
    value: number;
  }[];
};

export type MonetaryAwardType = {
  title: string;
  category: "S" | "M" | "L" | "XL";
  priceData: PricingProps[];
  variant: keyof typeof Role;
};

export type CollaboratorCardDataType = {
  name: string;
  location: string;
};
