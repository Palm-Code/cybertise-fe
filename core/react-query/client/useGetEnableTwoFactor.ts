"use client";
import {
  I_GetEnableTwoFactorResponsePayload,
  I_GetEnableTwoFactorSuccessResponse,
} from "@/core/models/auth/two_factor/get_two_factor";
import { fetchGetEnableTwoFactor } from "@/core/services/auth/two-factor";
import { useMutation } from "@tanstack/react-query";

export const useGetEnableTwoFactor = () => {
  const mutation = useMutation<
    I_GetEnableTwoFactorSuccessResponse,
    I_GetEnableTwoFactorSuccessResponse["data"],
    I_GetEnableTwoFactorResponsePayload
  >({
    mutationFn: fetchGetEnableTwoFactor,
  });

  return mutation;
};
