"use client";
import { I_GetLoginSuccessResponse } from "@/core/models/auth/login";
import { I_GetErrorResponse } from "@/core/models/common";
import { fetchPostLogin } from "@/core/services/auth/login";
import { FormLoginSchema } from "@/types/auth/sign-in";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "usehooks-ts";

export const usePostSignIn = (callbackUrl: string | null) => {
  const [_, setCallbackUrl] = useLocalStorage("callbackUrl", "");
  const { replace } = useRouter();
  const mutation = useMutation<
    I_GetLoginSuccessResponse,
    I_GetErrorResponse,
    FormLoginSchema
  >({
    mutationFn: fetchPostLogin,
    onSuccess(data, variables) {
      mutation.reset();
      callbackUrl && setCallbackUrl(callbackUrl);
      data.data["two-factor"]
        ? replace(`/auth/signin?code=${data.data.session_code}`)
        : data.data.deactivated_at
          ? null
          : replace(`/auth/signin?authenticate_email=${variables.email}`);
    },
    onError(error) {
      return error;
    },
  });

  return mutation;
};
