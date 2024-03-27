import { CreateVrpFragment } from "@/feature/mediator/fragments";
import { CreateVrpFragment as CreateCompanyVrpFragment } from "@/feature/company/fragments";
import { getSession } from "@/service/server/session";

export default async function VRPLaunchpadDetailPage() {
  const session = await getSession();

  if (session?.user.role === "company") {
    return <CreateCompanyVrpFragment />;
  }

  return <CreateVrpFragment />;
}
