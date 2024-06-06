import { I_GetActivityParamsRequest } from "@/core/models/company/manage-company/activity_log";
import { getTimezone } from "@/utils/time-options";
import { create } from "zustand";

export type State = {
  payload: I_GetActivityParamsRequest;
};

export type Actions = {
  setPayload: (payload: I_GetActivityParamsRequest) => void;
};

const initialState: State = {
  payload: {
    params: {
      timezone: getTimezone(),
      page_size: 30,
      sort: "-updated_at",
    },
  },
};

export const useActivityLogParamStore = create<State & Actions>()((set) => {
  return {
    ...initialState,
    setPayload: (payload: I_GetActivityParamsRequest) => {
      set((state) => ({
        ...state,
        payload,
      }));
    },
  };
});
