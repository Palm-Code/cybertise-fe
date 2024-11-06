"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { I_UpdateProfile } from "@/core/models/company/settings";
import { fetchPostUpdateProfile } from "@/core/services/common";
import { useUserStore } from "@/core/zustands/globals/store";
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
    onSuccess: (data) => {
      mutations.reset();
      !revalidate && router.back();
      toast.success("Update profile successfully", {
        position: "bottom-right",
      });
      queryClient.invalidateQueries({
        queryKey: ["getUserProfile"],
      });
      queryClient.invalidateQueries({
        queryKey: ["getServerUserData"],
      });
      useUserStore.setState({
        data: {
          ...useUserStore.getState().data,
          avatar: data.data.image,
          name: data.data.name,
        },
      });
    },
    onError: (error) => {
      mutations.reset();
      toast.error(error.message, {
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
    },
  });

  return mutations;
};
