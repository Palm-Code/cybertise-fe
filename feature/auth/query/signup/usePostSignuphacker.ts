"use client";
import { SignupHackerFormType } from "@/core/models/auth/register";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostRegisterHacker } from "@/core/services/auth/regsiter";
import { useMutation } from "@tanstack/react-query";

export const usePostSignupHacker = () => {
  const mutation = useMutation<[], I_GetErrorRes, SignupHackerFormType>({
    retry: 3,
    mutationFn: fetchPostRegisterHacker,
  });

  if (mutation.error) {
    throw new Error(JSON.stringify(mutation.error));
  }

  return mutation;
};
