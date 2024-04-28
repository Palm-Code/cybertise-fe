"use client";
import {
  I_GetChatListItemSuccessResponse,
  I_GetErrorRes,
} from "@/core/models/common";
import { fetchPostChatItem } from "@/core/services/common";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const usePostChatItem = () => {
  const queryClient = useQueryClient();
  const mutations = useMutation<
    I_GetChatListItemSuccessResponse["data"][0],
    I_GetErrorRes,
    I_GetChatListItemSuccessResponse["data"][0]
  >({
    mutationKey: ["usePostChatItem"],
    mutationFn: (payload) => {
      return fetchPostChatItem(payload);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["getChatListItem"],
      });
    },
  });

  return mutations;
};
