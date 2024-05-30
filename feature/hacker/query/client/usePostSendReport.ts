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
    mutationFn: (payload) => {
      return fetchPostReports(payload);
    },
    onError: (error) => {
      toast.error("Failed to send report", {
        position: "bottom-right",
        duration: 2000,
      });
    },
  });

  return mutation;
};
