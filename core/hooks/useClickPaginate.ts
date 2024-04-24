import { I_GetParamsPayload } from "@/core/models/common";
import { StoreType } from "./types";

export function useClickPaginate(value: number, store: StoreType) {
  const { payload, setPayload } = store;
  setPayload({
    ...payload,
    params: {
      ...payload.params,
      page: {
        ...payload.params?.page!,
        number: value,
      },
    },
  });
}
