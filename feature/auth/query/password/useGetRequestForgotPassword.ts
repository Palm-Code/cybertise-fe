"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchGetRequestForgotPassword } from "@/core/services/auth/password";
import { useMutation } from "@tanstack/react-query";

export const useGetRequestForgotPassword = () => {
  const mutation = useMutation<[], I_GetErrorRes, string>({
    mutationFn: fetchGetRequestForgotPassword,
    onError: (error) => {
      return error;
    },
  });

  return mutation;
};
