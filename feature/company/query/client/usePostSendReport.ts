"use client";
import { I_GetErrorRes, I_PostTempFilesResponse } from "@/core/models/common";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { fetchPostReports } from "@/core/services/common/fetchPostReports";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostSendReports = () => {
  const mutation = useMutation<
    I_PostTempFilesResponse,
    I_GetErrorRes,
    SendReportRequestType
  >({
    retry: 3,
    mutationFn: (payload) => {
      return fetchPostReports(payload);
    },
  });

  if (mutation.error) {
    mutation.reset();
    toast.error(mutation.error.message, {
      position: "bottom-right",
      action: {
        label: "retry",
        onClick: () => {
          mutation.mutateAsync(mutation.variables as SendReportRequestType);
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
