"use client";
import { fetchPostLogout } from "@/core/services/auth/logout";
import { logout } from "@/service/server/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const usePostLogout = () => {
  const mutation = useMutation({
    mutationFn: fetchPostLogout,
    onSuccess(data) {
      localStorage.removeItem("callbackUrl");
      toast.success("Logout success", {
        duration: 500,
        position: "bottom-right",
      });
      logout();
    },
    onError(error) {
      toast.error(error.message, {
        position: "bottom-right",
      });
    },
  });

  return mutation;
};
