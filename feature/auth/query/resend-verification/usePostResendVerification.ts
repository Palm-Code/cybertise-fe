"use client";
import {
  I_GetResendVerificationRequest,
  I_GetResendVerificationSuccessResponse,
} from "@/core/models/auth/resend-verification";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostResendVerification } from "@/core/services/auth/resend-verification";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

export const usePostResendVerification = () => {
  const [_, setValue] = useLocalStorage("expiredTime", "");
  const mutation = useMutation<
    I_GetResendVerificationSuccessResponse["data"],
    I_GetErrorRes,
    I_GetResendVerificationRequest
  >({
    mutationFn: fetchPostResendVerification,
    onSuccess: (data) => {
      setValue(data.expired_at);
      toast.success(data.message, {
        position: "bottom-right",
      });
    },
    onError: (error) => {
      let currentDate = new Date();
      currentDate = new Date(currentDate.getTime() + 5 * 60000); //add 5 minutes more if the verification failed
      setValue(currentDate.toISOString());
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  return mutation;
};
