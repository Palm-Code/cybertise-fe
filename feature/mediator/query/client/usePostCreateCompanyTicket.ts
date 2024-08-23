"use client";
import {
  I_GetChatListItemSuccessResponse,
  I_GetErrorRes,
} from "@/core/models/common";
import { fetchPostCreateCompanyTicket } from "@/core/services/mediator/reports/fetchPostCreateCompanyTicket";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostCreateCompanyTicket = () => {
  const mutation = useMutation<
    I_GetChatListItemSuccessResponse,
    I_GetErrorRes,
    string
  >({
    retry: 3,
    mutationFn: (payload) => {
      return fetchPostCreateCompanyTicket(payload);
    },
    onSuccess: () => {
      toast.success("Successfully create company ticket", {
        position: "bottom-right",
        duration: 2000,
        action: {
          label: "Back to Reports",
          onClick: () => (window.location.href = "/reports"),
        },
        onDismiss: () => {
          window.location.href = "/reports";
        },
        onAutoClose: () => {
          window.location.href = "/reports";
        },
      });
    },
  });

  if (mutation.error) {
    mutation.reset();
    toast.error(mutation.error.message, {
      position: "bottom-right",
      action: {
        label: "retry",
        onClick: () => {
          mutation.mutateAsync(mutation.variables as string);
        },
      },
      cancel: {
        label: "Close",
        onClick: () => {
          toast.dismiss();
        },
      },
      duration: 3000,
    });
  }

  return mutation;
};
