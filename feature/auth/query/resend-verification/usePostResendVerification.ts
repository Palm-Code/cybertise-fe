"use client";
import {
  I_GetResendVerificationRequest,
  I_GetResendVerificationSuccessResponse,
} from "@/core/models/auth/resend-verification";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostResendVerification } from "@/core/services/auth/resend-verification/fetchPostResendverification";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostResendVerification = () => {
  const mutation = useMutation<
    I_GetResendVerificationSuccessResponse,
    I_GetErrorRes,
    I_GetResendVerificationRequest
  >({
    mutationFn: fetchPostResendVerification,
    onSuccess: (data) => {
      toast.success(data.data.message, {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  return mutation;
};
