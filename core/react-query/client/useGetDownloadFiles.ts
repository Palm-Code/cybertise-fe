"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchGetDownloadFiles } from "@/core/services/common";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetDownloadFiles = () => {
  const mutations = useMutation<
    any,
    I_GetErrorRes,
    {
      id: string;
      filename: string;
    }
  >({
    mutationKey: ["useGetDownloadFiles"],
    mutationFn: (payload) => {
      return fetchGetDownloadFiles(payload.id, payload.filename);
    },
    onSuccess: (data) => {
      mutations.reset();
    },
    onError: (error) => {
      toast.error("Failed to download file", {
        position: "bottom-right",
        duration: 2000,
        action: {
          label: "retry",
          onClick: () => {
            mutations.mutate(mutations.variables as any);
          },
        },
      });
    },
  });

  return mutations;
};
