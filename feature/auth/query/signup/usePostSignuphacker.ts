"use client";
import { SignupHackerFormType } from "@/core/models/auth/register";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchPostRegisterHacker } from "@/core/services/auth/regsiter";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";
import { toast } from "sonner";

export const usePostSignupHacker = () => {
  const [_, setExpiredTime] = useLocalStorage("expiredTime", "");
  const router = useRouter();
  const mutation = useMutation<[], I_GetErrorRes, SignupHackerFormType>({
    mutationFn: fetchPostRegisterHacker,
    onSuccess: (_, variables) => {
      // Set expired time 5 minutes from now
      setExpiredTime(new Date(Date.now() + 5 * 60 * 1000).toString());
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
