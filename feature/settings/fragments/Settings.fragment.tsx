"use client";
import { Role } from "@/types/admin/sidebar";
import { Settings } from "../component";
import { useGetUserProfile } from "@/core/react-query/client";
import { Loader } from "@/core/ui/components";
export interface I_SettingsFragmentProps {
  role: keyof typeof Role;
}
const SettingsFragment = ({ role }: I_SettingsFragmentProps) => {
  const { data: userData, isLoading } = useGetUserProfile();
  if (isLoading) return <Loader variant={role} />;
  return <Settings initialData={userData?.data} role={role} />;
};
export default SettingsFragment;
