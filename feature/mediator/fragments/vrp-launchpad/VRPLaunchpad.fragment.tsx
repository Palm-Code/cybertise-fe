"use client";
import dynamic from "next/dynamic";

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
