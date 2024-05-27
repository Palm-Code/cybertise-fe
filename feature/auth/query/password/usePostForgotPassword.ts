"use client";
import { I_GetForgotPasswordRequest } from "@/core/models/auth/forgot-password";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostForgotPassword } from "@/core/services/auth/password";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostForgotPassword = () => {
  const router = useRouter();
  const mutation = useMutation<[], I_GetErrorRes, I_GetForgotPasswordRequest>({
    mutationFn: fetchPostForgotPassword,
    onSuccess: () => {
      toast.success("Successfully set new password", {
        position: "bottom-right",
      });
      router.replace("/auth/signin");
    },
  });

  if (mutation.error) {
    toast.error("Failed to set new password", {
      position: "bottom-right",
    });
  }

  return mutation;
};
