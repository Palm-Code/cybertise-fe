import { OverviewFragment } from "@/feature/company/fragments";

const VRPLaunchpadOverview = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return <OverviewFragment id={id} />;
};
export default VRPLaunchpadOverview;
