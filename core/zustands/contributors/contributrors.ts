import { I_GetParamsPayload } from "@/core/models/common";
import { create } from "zustand";

export type State = {
  payload: I_GetParamsPayload;
};

export type Actions = {
  setPayload: (payload: I_GetParamsPayload) => void;
};

export const initialState: State = {
  payload: {
    params: {
      include: "user",
      sort: "-user.valid_report",
    },
  },
};

export const useContributorsParamsStore = create<State & Actions>()((set) => {
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
