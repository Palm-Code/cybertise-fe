import { I_GetUserDataSuccessResponse, I_UserData } from "@/core/models/common";
import { create } from "zustand";
export type State = {
  data: I_GetUserDataSuccessResponse["data"];
};

export type Actions = {
  setUserData: (payload: I_GetUserDataSuccessResponse["data"]) => void;
};

const initialState: State = {
  data: {
    id: "",
    name: "",
    email: "",
    role: "hacker",
    avatar: "",
  },
};

export const useUserStore = create<State & Actions>()((set) => {
  return {
    ...initialState,
    setUserData: (payload: I_GetUserDataSuccessResponse["data"]) => {
      set((state) => ({
        ...state,
        data: payload,
      }));
    },
  };
});
