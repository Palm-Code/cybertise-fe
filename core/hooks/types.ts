import { I_GetParamsPayload } from "../models/common";

export type State = {
  payload: I_GetParamsPayload;
};
export type Actions = {
  setPayload: (payload: I_GetParamsPayload) => void;
};

export type StoreType = State & Actions;
