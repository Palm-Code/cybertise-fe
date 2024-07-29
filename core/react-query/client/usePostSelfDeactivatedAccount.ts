"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostSelfDeactivatedAccount } from "@/core/services/auth/self-deactivated-account";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostSelfDeactivatedAccount = () => {
  const mutations = useMutation<any, I_GetErrorRes, string>({
    mutationKey: ["usePostUpdateProfile"],
    mutationFn: (payload) => {
      return fetchPostSelfDeactivatedAccount(payload);
    },
    onSuccess: (data) => {
      toast.success("Your account has been deactivated", {
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
            mutations.mutateAsync(mutations.variables as string);
          },
        },
        duration: 3000,
      });
    },
  });

  return mutations;
};
