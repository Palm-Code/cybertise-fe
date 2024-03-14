import { SettingsFragment } from "@/feature/settings/fragments";
import { getSession } from "@/server/session";
import { Role } from "@/types/admin/sidebar";

export default async function DashboardPage() {
  const session = await getSession();
  return <SettingsFragment role={session?.user.role as Role} />;
}
