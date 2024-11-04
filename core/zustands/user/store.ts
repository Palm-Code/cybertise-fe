import { I_GetUserDataSuccessResponse } from "@/core/models/common";
import { create } from "zustand";

export type UserState = I_GetUserDataSuccessResponse["data"];

export const useUserStore = create<{ data: UserState }>(() => ({
  data: {
    id: "",
    name: "",
    email: "",
    avatar: "",
    role: "hacker",
    language: "en",
  },
}));
