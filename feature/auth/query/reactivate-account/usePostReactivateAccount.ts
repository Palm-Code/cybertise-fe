"use client";
import { I_GetLoginSuccessResponse } from "@/core/models/auth/login";
import { I_GetErrorResponse } from "@/core/models/common";
import { fetchPostReactivateAccount } from "@/core/services/auth/self-deactivated-account";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePostReactivateAccount = () => {
  const mutation = useMutation<
    I_GetLoginSuccessResponse,
    I_GetErrorResponse,
    string
  >({
    mutationFn: (payload) => {
      return fetchPostReactivateAccount(payload);
    },
    onSuccess(data) {
      mutation.reset();
      data.data["two-factor"]
        ? (window.location.href = `/auth/signin?code=${data.data.session_code}`)
        : data.data.deactivated_at
          ? null
          : (window.location.href = `/auth/signin?authenticate_email=${data.data.email}`);
    },
    onError(error) {
      return error;
    },
  });

  return mutation;
};
