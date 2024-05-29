"use client";
import { SignupCompanyFormType } from "@/core/models/auth/register";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostRegisterCompany } from "@/core/services/auth/regsiter";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePostSignupCompany = () => {
  const router = useRouter();
  const mutation = useMutation<[], I_GetErrorRes, SignupCompanyFormType>({
    retry: 3,
    mutationFn: fetchPostRegisterCompany,
    onSuccess: (_, variables) => {
      router.replace(
        `/auth/signup?type=company&authenticate_email=${variables.email}`
      );
    },
  });

  if (mutation.error) {
    throw new Error(JSON.stringify(mutation.error));
  }

  return mutation;
};
