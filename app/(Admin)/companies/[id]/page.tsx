import { CompaniesDetailFragment } from "@/feature/mediator/fragments";

export default function VRPLaunchpadDetailPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return <CompaniesDetailFragment id={params.id} />;
}
