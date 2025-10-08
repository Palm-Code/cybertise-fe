"use client";
import { I_GetCountryListSuccessResponse } from "@/core/models/common";
import { useCountryListStore } from "./store";

export default function CountryListInitializer({
  children,
  countryList,
}: {
  children: React.ReactNode;
  countryList: I_GetCountryListSuccessResponse;
}) {
  const { data } = countryList;
  const countryListData = data.map((item) => ({
    label: item.name,
    value: item.code,
    icon: item.flag_url,
  }));

  useCountryListStore.setState({ data: countryListData });
  return children;
}
