"use client";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchGetRequestForgotPassword } from "@/core/services/auth/password";
import { useMutation } from "@tanstack/react-query";

export const useGetRequestForgotPassword = () => {
  const mutation = useMutation<[], { email: string[] }, string>({
    mutationFn: fetchGetRequestForgotPassword,
  });

  return mutation;
};
