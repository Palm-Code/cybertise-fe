import { I_GetParamsPayload } from "@/core/models/common";
import { create } from "zustand";

export type State = {
  payload: I_GetParamsPayload;
};

export type Actions = {
  setPayload: (payload: I_GetParamsPayload) => void;
};

const initialState: State = {
  payload: {
    params: {
      sort: "name",
      page: {
        size: 10,
        number: 1,
      },
      append: "program_count,asset_types,name,logo",
    },
  },
};

export const useCompaniesParamsStore = create<State & Actions>()((set) => {
  return {
    ...initialState,
    setPayload: (payload: I_GetParamsPayload) => {
      set((state) => ({
        ...state,
        payload,
      }));
    },
  };
});
