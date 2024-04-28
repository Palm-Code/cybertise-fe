import { I_GetParamsPayload } from "@/core/models/common";
import { create } from "zustand";
import { State, StoreType } from "@/core/hooks/types";

const initialState: State = {
  payload: {
    params: {
      sort: "-updated_at",
      page: {
        size: 100,
        number: 1,
      },
    },
  },
};

export const useReportDetailsParamStore = create<StoreType>()((set) => {
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
