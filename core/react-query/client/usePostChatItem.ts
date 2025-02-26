"use client";
import {
  I_GetChatListItemSuccessResponse,
  I_GetErrorRes,
} from "@/core/models/common";
import { fetchPostChatItem } from "@/core/services/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getChatListItem"],
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  return mutations;
};
