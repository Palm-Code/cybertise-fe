import { VrpManagementFragment } from "@/feature/company/fragments";
import { VRPLaunchpadFragment } from "@/feature/mediator/fragments";
import { getSession } from "@/service/server/session";

export default async function VRPLaunchpadPage() {
  const session = await getSession();

  if (session?.user.role === "company") {
    return <VrpManagementFragment />;
  }

  return <VRPLaunchpadFragment />;
}
