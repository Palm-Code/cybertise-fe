import { StateCreator, create } from "zustand";
interface TokenSlice {
  token: string;
  setToken: (token: string) => void;
}

const createTokenSlice: StateCreator<TokenSlice> = (set) => ({
  token: "",
  setToken: (token: string) => set({ token }),
});

export type SessionSlice = TokenSlice;

export const useSessionStore = create<SessionSlice>()((...a) => ({
  ...createTokenSlice(...a),
}));
