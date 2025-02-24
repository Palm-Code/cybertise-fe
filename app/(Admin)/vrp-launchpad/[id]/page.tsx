import { DetailsVRPFragment } from "@/feature/company/fragments";
import { getSession } from "@/service/server/session";

export default async function VRPLaunchpadDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const session = await getSession();
  return (
    <DetailsVRPFragment
      id={params.id}
      variant={session?.user.role}
    />
  );
}
