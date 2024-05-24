"use client";
import {
  I_GetAccessTokenPayload,
  I_GetAccessTokenSuccessResponse,
} from "@/core/models/auth/login/get_access_token";
import { fetchGetAccessToken } from "@/core/services/auth/login";
import { authorize } from "@/service/server/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "universal-cookie";

export const useGetAccessToken = () => {
  const { push } = useRouter();
  const mutation = useMutation<
    I_GetAccessTokenSuccessResponse,
    I_GetAccessTokenSuccessResponse["data"],
    I_GetAccessTokenPayload
  >({
    mutationFn: fetchGetAccessToken,
    onSuccess(data) {
      authorize(data.data);
      const cookies = new Cookies();
      cookies.set("token", data.data["access-token"], { path: "/" });
    },
    onError(error) {
      if (!error["access-token"]) {
        toast.error(error.message, {
          position: "bottom-right",
        });
        mutation.reset();
      }
    },
    onSettled() {
      push("/");
    },
  });

  return mutation;
};
