"use client";
import { fetchPostLogout } from "@/core/services/auth/logout";
import { logout } from "@/service/server/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";

export const usePostLogout = () => {
  const [_, setCallbackUrl] = useLocalStorage("callbackUrl", "");
  const mutation = useMutation({
    mutationFn: fetchPostLogout,
    onSuccess(data) {
      setCallbackUrl("");
      toast.success("Logout success", {
        position: "bottom-right",
      });
      logout();
    },
    onError(error) {
      toast.error("Logout error", {
        position: "bottom-right",
      });
    },
  });

  return mutation;
};
