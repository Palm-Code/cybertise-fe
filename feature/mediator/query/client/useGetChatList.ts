"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard/get_chat_list";
import { I_GetErrorResponse } from "@/core/models/hacker/programs";
import { fetchGetChatList } from "@/core/services/hacker/dashboard";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { useMediaQuery } from "usehooks-ts";

export const useGetChatList = (payload?: I_GetParamsPayload) => {
  const isMobileDevice = useMediaQuery("(max-width: 1279px)");
  const queryInfinity = useInfiniteQuery({
    queryKey: ["getChatList", payload?.params?.filter, payload?.params?.sort],
    queryFn: (pageParam) =>
      fetchGetChatList({
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
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });

  const query = useQuery<I_GetChatListSuccessResponse, I_GetErrorResponse>({
    queryKey: [
      "getChatList",
      payload?.params?.page,
      payload?.params?.filter,
      payload?.params?.sort,
    ],
    queryFn: () => fetchGetChatList(payload),
    placeholderData: keepPreviousData,
    enabled: !isMobileDevice,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { queryDesktop: query, queryMobile: queryInfinity };
};
