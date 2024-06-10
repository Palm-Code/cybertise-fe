"use client";
import {
  I_GetAccessTokenPayload,
  I_GetAccessTokenSuccessResponse,
} from "@/core/models/auth/login/get_access_token";
import { I_GetErrorRes } from "@/core/models/common";
import { fetchGetAccessToken } from "@/core/services/auth/login";
import { authorize } from "@/service/server/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "universal-cookie";
import { useReadLocalStorage } from "usehooks-ts";

export const useGetAccessToken = () => {
  const callbackUrl = useReadLocalStorage<string>("callbackUrl");
  const { push } = useRouter();
  const mutation = useMutation<
    I_GetAccessTokenSuccessResponse,
    I_GetErrorRes,
    I_GetAccessTokenPayload
  >({
    mutationFn: fetchGetAccessToken,
    onSuccess: async (data, variables) => {
      await authorize(data.data);
      const cookies = new Cookies();
      cookies.set("token", data.data["access-token"], { path: "/" });
      if (!!variables.totp) {
        push("/");
      }
    },
    onError(error) {
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
    onSettled(data, error, variables) {
      if (!!variables.totp) return;
      if (!!callbackUrl) {
        window.location.href = callbackUrl;
        localStorage.removeItem("callbackUrl");
        return;
      }
      push("/");
    },
  });

  return mutation;
};
