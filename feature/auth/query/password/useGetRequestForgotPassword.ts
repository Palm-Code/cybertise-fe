"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchGetRequestForgotPassword } from "@/core/services/auth/password";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

export const useGetRequestForgotPassword = () => {
  const [_, setValue] = useLocalStorage("expiredTime", "");
  const mutation = useMutation<
    {
      expired_at: string;
      message: string;
    },
    I_GetErrorRes,
    string
  >({
    mutationFn: fetchGetRequestForgotPassword,
    onSuccess: (data) => {
      setValue(data.expired_at);
      toast.success(data.message);
    },
    onError: (error) => {
      return error;
    },
  });

  return mutation;
};
