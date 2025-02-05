"use client";
import {
  I_GetResendVerificationRequest,
  I_GetResendVerificationSuccessResponse,
} from "@/core/models/auth/resend-verification";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostResendVerification } from "@/core/services/auth/resend-verification/fetchPostResendverification";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

export const usePostResendVerification = () => {
  const [_, setValue] = useLocalStorage("expiredTime", "");
  const mutation = useMutation<
    I_GetResendVerificationSuccessResponse,
    I_GetErrorRes,
    I_GetResendVerificationRequest
  >({
    mutationFn: fetchPostResendVerification,
    onSuccess: (data) => {
      setValue(data.data.expired_at);
      toast.success("Verification code has been sent", {
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
