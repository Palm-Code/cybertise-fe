"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { UpdateFormRequestType } from "@/core/models/company/vrp-management/publish_update";
import { fetchPostUpdates } from "@/core/services/company/vrp-management";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostUpdates = () => {
  const queryClient = useQueryClient();
  const mutations = useMutation<[], I_GetErrorRes, UpdateFormRequestType>({
    mutationFn: (payload) => {
      return fetchPostUpdates(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getProgramListDetails"],
      });
      toast.success("Successfully create an update", {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      mutations.reset();
      toast.error(error.message, {
        position: "bottom-right",
        action: {
          label: "retry",
          onClick: () => {
            mutations.mutateAsync(mutations.variables as UpdateFormRequestType);
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
    },
  });

  return mutations;
};
