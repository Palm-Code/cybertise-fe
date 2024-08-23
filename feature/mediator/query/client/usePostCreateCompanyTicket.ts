"use client";
import {
  I_GetChatListItemSuccessResponse,
  I_GetErrorRes,
  SendReportRequestType,
} from "@/core/models/common";
import { fetchPostCreateCompanyTicket } from "@/core/services/mediator/reports/fetchPostCreateCompanyTicket";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostCreateCompanyTicket = (id: string) => {
  const mutation = useMutation<
    I_GetChatListItemSuccessResponse,
    I_GetErrorRes,
    SendReportRequestType
  >({
    retry: 3,
    mutationFn: (payload) => {
      return fetchPostCreateCompanyTicket(payload, id);
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
          mutation.mutateAsync(mutation.variables);
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
