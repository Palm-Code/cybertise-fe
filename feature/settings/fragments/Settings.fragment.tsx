import { Role } from "@/types/admin/sidebar";
import { Settings } from "../component";
export interface I_SettingsFragmentProps {
  role: keyof typeof Role;
}
const SettingsFragment = ({ role }: I_SettingsFragmentProps) => {
  return <Settings role={role} />;
};
export default SettingsFragment;
