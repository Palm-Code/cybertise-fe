"use client";
import { I_GetResetPasswordRequest } from "@/core/models/auth/forgot-password";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostResetPassword } from "@/core/services/auth/password";
import { logout } from "@/service/server/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostResetPassword = () => {
  const router = useRouter();
  const mutation = useMutation<[], I_GetErrorRes, I_GetResetPasswordRequest>({
    mutationFn: fetchPostResetPassword,
    onSuccess: (_, variables) => {
      mutation.reset();
      toast.success("Successfully set new password", {
        position: "bottom-right",
      });
      if (variables.logout_all === 1) {
        logout();
        router.replace("/auth/signin");
        return;
      }
      router.replace("/settings");
    },
  });

  if (mutation.error) {
    mutation.reset();
    toast.error(mutation.error.message, {
      position: "bottom-right",
    });
  }

  return mutation;
};
