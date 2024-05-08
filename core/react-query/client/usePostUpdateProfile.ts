"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { I_UpdateProfile } from "@/core/models/company/settings";
import { fetchPostUpdateProfile } from "@/core/services/common";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostUpdateProfile = (revalidate: boolean = false) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const mutations = useMutation<
    I_GetUserProfileSuccessResponse,
    I_GetErrorRes,
    I_UpdateProfile
  >({
    mutationKey: ["usePostUpdateProfile"],
    mutationFn: (payload) => {
      return fetchPostUpdateProfile(payload);
    },
  });

  if (mutations.error) {
    mutations.reset();
    toast.error(mutations.error.message, {
      position: "bottom-right",
      action: {
        label: "retry",
        onClick: () => {
          mutations.mutateAsync(mutations.variables as I_UpdateProfile);
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
    if (revalidate) {
      mutations.reset();
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile"],
      });
    }
    toast.success("Update profile successfully", {
      position: "bottom-right",
      cancel: {
        label: "Close",
        onClick: () => {
          if (revalidate) return mutations.reset();
          queryClient.invalidateQueries({
            queryKey: ["getUserProfile"],
          });
          router.back();
        },
      },
      duration: 3000,
      onDismiss: () => {
        if (revalidate) return mutations.reset();
        queryClient.invalidateQueries({
          queryKey: ["getUserProfile"],
        });
        router.back();
      },
      onAutoClose: () => {
        if (revalidate) return mutations.reset();
        queryClient.invalidateQueries({
          queryKey: ["getUserProfile"],
        });
        router.back();
      },
    });
  }

  return mutations;
};
