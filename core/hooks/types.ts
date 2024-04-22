import { I_GetParamsPayload } from "../models/common";

type State = {
  payload: I_GetParamsPayload;
};
type Actions = {
  setPayload: (payload: I_GetParamsPayload) => void;
};

export type StoreType = State & Actions;
