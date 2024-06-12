"use client";
import { SignupHackerFormType } from "@/core/models/auth/register";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostRegisterHacker } from "@/core/services/auth/regsiter";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const usePostSignupHacker = () => {
  const router = useRouter();
  const mutation = useMutation<[], I_GetErrorRes, SignupHackerFormType>({
    mutationFn: fetchPostRegisterHacker,
    onSuccess: (_, variables) => {
      router.replace(
        `/auth/signup?type=hacker&authenticate_email=${variables.email}`
      );
    },
    onError: (error) => {
      if (error.code === 500) throw new Error(error.message);
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  return mutation;
};
