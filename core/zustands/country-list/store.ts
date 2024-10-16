import { create } from "zustand";

export type CountryState = {
  label: string;
  value: string;
  icon: string;
};

export const useCountryListStore = create<{ data: CountryState[] }>(() => ({
  data: [],
}));
