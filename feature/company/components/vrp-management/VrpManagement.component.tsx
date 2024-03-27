import { Typography } from "@/core/ui/components";
import VRPCardList from "./card/VrpCard";
import { vrpData } from "../../constants/vrp-management";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import Link from "next/link";

const VrpManagement = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-10 pt-12">
      <Typography variant="h4" weight="bold">
        VRP Management
      </Typography>
      <VRPCardList data={vrpData} />
      <Link
        href={"/vrp-launchpad/create-vrp"}
        className="w-full rounded-md border border-white px-4 py-6 text-center"
      >
        + Add New VRP
      </Link>
      {/* <EmptyState
        variant="company"
        type="program"
        buttonText="Add New VRP"
        href=""
      /> */}
    </div>
  );
};
export default VrpManagement;
