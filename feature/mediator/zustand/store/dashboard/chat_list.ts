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
      sort: "-updated_at",
      page: {
        size: 10,
        number: 1,
      },
      include: "vulnerabiityType,program,company",
    },
  },
};

export const useChatListParamStore = create<State & Actions>()((set) => {
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
