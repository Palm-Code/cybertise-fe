"use client";
import { I_PostChatListItemsPayload } from "@/core/models/common";
import { useMutationState } from "@tanstack/react-query";

export const useGetMutationState = () => {
  const mutations = useMutationState({
    filters: { status: "pending" },
    select: (mutation) =>
      mutation.state.variables as I_PostChatListItemsPayload,
  });
  return mutations;
};
