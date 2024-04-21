import { I_GetProgramListPayload } from "@/core/models/hacker/programs";
import { create } from "zustand";

export type State = {
  payload: I_GetProgramListPayload;
};

export type Actions = {
  setPayload: (payload: I_GetProgramListPayload) => void;
};

const initialState: State = {
  payload: {
    params: {
      page: {
        size: 10,
        number: 1,
      },
      include: "company,targetAssets",
      append: "asset_types",
      filter: {
        "programs.status": "published",
      },
    },
  },
};

export const useParamStore = create<State & Actions>()((set) => {
  return {
    ...initialState,
    setPayload: (payload: I_GetProgramListPayload) => {
      set((state) => ({
        ...state,
        payload,
      }));
    },
  };
});
