import { Role } from "@/types/admin/sidebar";
import { useGetUserData } from "../react-query/client";
import { logout } from "@/service/server/auth";

export const useGetRole = () => {
  const { data, isError, isSuccess } = useGetUserData();
  if (isSuccess) {
    return data.role.toLowerCase() as keyof typeof Role;
  }
  if (isError) {
    logout();
  }
};
