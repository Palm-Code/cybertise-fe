"use client";
import { I_GetErrorRes, I_PostTempFilesResponse } from "@/core/models/common";
import { fetchPostTempFiles } from "@/core/services/common/postTempFile";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostTempFiles = () => {
  const mutation = useMutation<I_PostTempFilesResponse, I_GetErrorRes, File>({
    retry: 3,
    mutationFn: (payload) => {
      const formData = new FormData();
      formData.append("file", payload);
      formData.append("content", payload.name);
      return fetchPostTempFiles(formData);
    },
  });

  if (mutation.isError) {
    toast.error(mutation.error.message, {
      position: "bottom-right",
      action: {
        label: "retry",
        onClick: () => {
          mutation.mutate(mutation.variables);
        },
      },
    });
  }

  return mutation;
};
