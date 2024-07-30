"use client";
import { I_GetParamsPayload } from "@/core/models/common";
import { fetchGetChatListItem } from "@/core/services/common";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetChatListItem = (
  payload?: I_GetParamsPayload,
  id?: string,
  disableRefetch: boolean = false
) => {
  const query = useInfiniteQuery({
    queryKey: [
      "getChatListItem",
      id,
      payload?.params?.page,
      payload?.params?.filter,
    ],
    queryFn: (pageParam) =>
      fetchGetChatListItem({
        params: {
          ...payload?.params,
          page: {
            size: 30,
            number: pageParam.pageParam,
          },
          include: "chatTicket",
          filter: {
            ...payload?.params?.filter,
            chat_ticket_id: id,
          },
        },
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.meta?.current_page !== lastPage.meta?.last_page
        ? (lastPage?.meta?.current_page ?? 0) + 1
        : undefined,
    refetchOnMount: true,
    refetchInterval: disableRefetch ? 0 : 10000,
  });

  if (query.error) {
    throw new Error(JSON.stringify(query.error));
  }

  return query;
};
