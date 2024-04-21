import { StateCreator, create } from "zustand";
import { I_GetProgramListPayload } from "@/core/models/hacker/programs";

export interface ProgramParamsSlice {
  payload: I_GetProgramListPayload;
  setPayload: (payload: I_GetProgramListPayload) => void;
}

const initialState: ProgramParamsSlice = {
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
  setPayload: (payload: I_GetProgramListPayload) => {
    initialState.payload = payload;
  },
};

const createProgramParamsSlice: StateCreator<
  ProgramSlice,
  [],
  [],
  ProgramParamsSlice
> = (set) => ({
  ...initialState,
  setPayload: (payload: I_GetProgramListPayload) => {
    set((state) => ({
      ...state,
      payload,
    }));
  },
});

export type ProgramSlice = ProgramParamsSlice;

export const useProgramStore = create<ProgramSlice>()((...a) => ({
  ...createProgramParamsSlice(...a),
}));
