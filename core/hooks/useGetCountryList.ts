"use client";
import { useCountryListStore } from "../zustands/country-list";

export const useGetCountry = () => {
  const { data } = useCountryListStore.getState();
  if (data) {
    return { data: data };
  }
};
