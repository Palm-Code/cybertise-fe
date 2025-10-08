import { DetailsVRPFragment } from "@/feature/company/fragments";
import { getSession } from "@/service/server/session";

export default async function VRPLaunchpadDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getSession();
  return (
    <DetailsVRPFragment
      id={id}
      variant={session?.user.role}
    />
  );
}
