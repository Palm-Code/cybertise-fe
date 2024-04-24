import { I_GetParamsPayload } from "../models/common";
import { StoreType } from "./types";

export function useOnchangeSearch(
  value: string,
  store: StoreType,
  refetch: () => void
) {
  const { payload, setPayload } = store;
  if (value === "") {
    setPayload({
      ...payload,
      params: {
        ...payload.params,
        search: undefined,
      },
    });
    setTimeout(() => {
      refetch();
    }, 500);
  }
  setPayload({
    ...payload,
    params: {
      ...payload.params,
      search: value,
    },
  });
}
