"use client";
import { I_GetErrorRes, I_PostTempFilesResponse } from "@/core/models/common";
import { fetchPostTempFiles } from "@/core/services/common/postTempFile";
import { useMutation } from "@tanstack/react-query";

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

  return mutation;
};
