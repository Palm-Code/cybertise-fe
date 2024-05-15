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
      append: "program_count,asset_types,name,logo,description,website",
    },
  },
};

export const useCompaniesDetailParamsStore = create<State & Actions>()((
  set
) => {
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
