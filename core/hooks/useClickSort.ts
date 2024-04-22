import { StoreType } from "./types";

export function useClickSort(value: string, store: StoreType) {
  const { payload, setPayload } = store;
  {
    setPayload({
      ...payload,
      params: {
        ...payload.params,
        sort: value,
      },
    });
  }
}
