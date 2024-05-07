"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { UpdateFormRequestType } from "@/core/models/company/vrp-management/publish_update";
import { fetchPostUpdates } from "@/core/services/company/vrp-management";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostUpdates = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutations = useMutation<[], I_GetErrorRes, UpdateFormRequestType>({
    mutationFn: (payload) => {
      return fetchPostUpdates(payload);
    },
  });

  if (mutations.error) {
    mutations.reset();
    toast.error(mutations.error.message, {
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
  }

  if (mutations.isSuccess) {
    toast.success("Successfully create an update", {
      position: "bottom-right",
      cancel: {
        label: "Close",
        onClick: () => {
          queryClient.invalidateQueries({
            queryKey: ["getProgramListDetails"],
          });
          toast.dismiss();
        },
      },
      onDismiss: () => {
        queryClient.invalidateQueries({
          queryKey: ["getProgramListDetails"],
        });
        router.forward();
      },
      onAutoClose: () => {
        queryClient.invalidateQueries({
          queryKey: ["getProgramListDetails"],
        });
        router.forward();
      },
    });
  }

  return mutations;
};
