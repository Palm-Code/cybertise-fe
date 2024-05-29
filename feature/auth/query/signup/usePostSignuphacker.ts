"use client";
import { SignupHackerFormType } from "@/core/models/auth/register";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostRegisterHacker } from "@/core/services/auth/regsiter";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePostSignupHacker = () => {
  const router = useRouter();
  const mutation = useMutation<[], I_GetErrorRes, SignupHackerFormType>({
    retry: 3,
    mutationFn: fetchPostRegisterHacker,
    onSuccess: (_, variables) => {
      router.replace(
        `/auth/signup?type=hacker&authenticate_email=${variables.email}`
      );
    },
  });

  if (mutation.error) {
    throw new Error(JSON.stringify(mutation.error));
  }

  return mutation;
};
