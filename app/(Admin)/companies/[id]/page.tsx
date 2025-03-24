import { CompaniesDetailFragment } from "@/feature/mediator/fragments";

export default async function VRPLaunchpadDetailPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  return <CompaniesDetailFragment id={id} />;
}
