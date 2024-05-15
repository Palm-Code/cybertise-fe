import dynamic from "next/dynamic";
import { vrpCardsData } from "../../constants/vrp-launchpad";

const VRPLaunchpad = dynamic(
  () =>
    import("@/feature/mediator/components/vrp-launcpad/VrpLaunchpad.component"),
  {
    ssr: false,
  }
);

const VRPLaunchpadFragment = () => {
  return <VRPLaunchpad />;
};
export default VRPLaunchpadFragment;
