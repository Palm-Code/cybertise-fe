import { DetailsVRPFragment } from "@/feature/company/fragments";
import { CreateVrpFragment } from "@/feature/mediator/fragments";
import { getSession } from "@/service/server/session";

export default async function VRPLaunchpadDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getSession();

  if (session?.user.role === "company") {
    return <DetailsVRPFragment id={params.id} />;
  }

  return <CreateVrpFragment />;
}
