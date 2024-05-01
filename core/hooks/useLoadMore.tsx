"use client";
import { useCallback, useEffect } from "react";
import { StoreType } from "./types";
import { useInView } from "react-intersection-observer";

export default function useLoadMore(store: StoreType, pageNumbers: number) {
  const { ref, inView } = useInView({ threshold: 0.5 });
  const { payload, setPayload } = store;
  const loadMore = useCallback(() => {
    setPayload({
      ...payload,
      params: {
        ...payload.params!,
        page: {
          ...payload?.params?.page!,
          number: payload?.params?.page?.number! + 1,
        },
      },
    });
  }, [inView]);

  useEffect(() => {
    if (inView && payload?.params?.page?.number! !== pageNumbers) {
      loadMore();
    }
  }, [inView, loadMore]);

  return { ref };
}
