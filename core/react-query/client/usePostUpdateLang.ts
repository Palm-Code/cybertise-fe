"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { fetchPostUpdateLang } from "@/core/services/common";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostUpdateLang = () => {
  const mutations = useMutation<
    I_GetUserProfileSuccessResponse,
    I_GetErrorRes,
    string
  >({
    mutationKey: ["usePostUpdateProfile"],
    mutationFn: (payload) => {
      return fetchPostUpdateLang(payload);
    },
    onSuccess: (data) => {
      window.location.reload();
      toast.success("Successfully update language", {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-right",
        action: {
          label: "retry",
          onClick: () => {
            mutations.mutateAsync(mutations.variables as string);
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
