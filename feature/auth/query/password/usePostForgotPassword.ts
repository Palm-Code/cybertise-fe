"use client";
import { I_GetForgotPasswordRequest } from "@/core/models/auth/forgot-password";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostForgotPassword } from "@/core/services/auth/password";
import { logout } from "@/service/server/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostForgotPassword = () => {
  const mutation = useMutation<[], I_GetErrorRes, I_GetForgotPasswordRequest>({
    mutationFn: fetchPostForgotPassword,
    onSuccess: () => {
      toast.success("Successfully set new password", {
        position: "bottom-right",
      });
      logout();
      window.location.href = "/auth/signin";
    },
    onError: (error) => {
      mutation.reset();
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  return mutation;
};
