"use client";
import { I_GetResetPasswordRequest } from "@/core/models/auth/forgot-password";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostResetPassword } from "@/core/services/auth/password";
import { logout } from "@/service/server/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostResetPassword = () => {
  const mutation = useMutation<[], I_GetErrorRes, I_GetResetPasswordRequest>({
    mutationFn: fetchPostResetPassword,
    onSuccess: (_, variables) => {
      mutation.reset();
      toast.success("Successfully set new password", {
        position: "bottom-right",
      });
      if (variables.logout_all === 1) {
        logout();
        return;
      }
      window.location.reload();
    },
    onError: (error) => {
      mutation.reset();
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
    onSettled: () => {},
  });

  return mutation;
};
