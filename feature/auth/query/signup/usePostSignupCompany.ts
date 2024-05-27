"use client";
import { SignupCompanyFormType } from "@/core/models/auth/register";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostRegisterCompany } from "@/core/services/auth/regsiter";
import { useMutation } from "@tanstack/react-query";

export const usePostSignupCompany = () => {
  const mutation = useMutation<[], I_GetErrorRes, SignupCompanyFormType>({
    retry: 3,
    mutationFn: fetchPostRegisterCompany,
  });

  if (mutation.error) {
    throw new Error(JSON.stringify(mutation.error));
  }

  return mutation;
};
