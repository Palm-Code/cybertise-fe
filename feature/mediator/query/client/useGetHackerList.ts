"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { fetchGetHackerList } from "@/core/services/mediator/collaborators";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetHackerList = (id: string, payload?: I_GetParamsPayload) => {
  const queryInfinity = useInfiniteQuery({
    queryKey: ["getHackerList", payload?.params?.filter, payload?.params?.sort],
    queryFn: (pageParam) =>
      fetchGetHackerList(id, {
        params: {
          ...payload?.params,
          page: {
            size: 10,
            number: pageParam.pageParam,
          },
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.meta?.current_page !== lastPage.meta?.last_page
        ? (lastPage?.meta?.current_page ?? 0) + 1
        : undefined;
    },
    enabled: !!id,
  });

  if (queryInfinity.error) {
    throw new Error(JSON.stringify(queryInfinity.error));
  }

  return { queryMobile: queryInfinity };
};
