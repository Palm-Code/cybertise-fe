"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { fetchGetContributorList } from "@/core/services/common/contributors";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetContibutorList = (
  payload?: I_GetParamsPayload,
  id?: string
) => {
  const queryInfinity = useInfiniteQuery({
    queryKey: [
      "getContibutorList",
      payload?.params?.filter,
      payload?.params?.sort,
    ],
    queryFn: (pageParam) =>
      fetchGetContributorList({
        params: {
          ...payload?.params,
          filter: {
            ...payload?.params?.filter,
            program_id: id,
          },
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
