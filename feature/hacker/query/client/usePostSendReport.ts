"use client";
import { I_GetErrorRes, I_PostTempFilesResponse } from "@/core/models/common";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { fetchPostReports } from "@/core/services/common/fetchPostReports";
import { useMutation } from "@tanstack/react-query";

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
    throw new Error(JSON.stringify(mutation.error));
  }

  return mutation;
};
