"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostUpdateTicket } from "@/core/services/mediator/reports";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostUpdateTicket = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<[], I_GetErrorRes, string>({
    mutationFn: (payload) => {
      return fetchPostUpdateTicket(id, payload);
    },
    onSuccess: () => {
      mutation.reset();
      queryClient.invalidateQueries({
        queryKey: ["getChatListItem"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getTicketDetails"],
      });
      toast.success("Successfully update ticket", {
        position: "bottom-right",
        duration: 3000,
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-right",
        duration: 3000,
        action: {
          label: "Retry",
          onClick: () => mutation.mutateAsync(mutation.variables as string),
        },
      });
      return;
    },
  });

  return mutation;
};
