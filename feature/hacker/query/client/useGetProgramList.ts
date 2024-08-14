"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import {
  I_GetErrorResponse,
  I_GetProgramListSuccessResponse,
} from "@/core/models/hacker/programs";
import { fetchGetProgramList } from "@/core/services/hacker/programs/fetchGetProgramList";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useMediaQuery } from "usehooks-ts";

export const useGetProgramList = (payload?: I_GetParamsPayload) => {
  const isMobileDevice = useMediaQuery("(max-width: 1279px)");
  const queryInfinity = useInfiniteQuery({
    queryKey: [
      "getProgramList",
      payload?.params?.filter,
      payload?.params?.sort,
    ],
    queryFn: (pageParam) =>
      fetchGetProgramList({
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
    enabled: isMobileDevice,
  });

  const query = useQuery<I_GetProgramListSuccessResponse, I_GetErrorResponse>({
    queryKey: [
      "getProgramList",
      payload?.params?.page,
      payload?.params?.filter,
    ],
    queryFn: () => fetchGetProgramList(payload),
    placeholderData: keepPreviousData,
    enabled: !isMobileDevice,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return { queryDesktop: query, queryMobile: queryInfinity };
};
