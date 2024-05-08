import { OverviewFragment } from "@/feature/company/fragments";

const VRPLaunchpadOverview = ({ params }: { params: { id: string } }) => {
  return <OverviewFragment id={params.id} />;
};
export default VRPLaunchpadOverview;
