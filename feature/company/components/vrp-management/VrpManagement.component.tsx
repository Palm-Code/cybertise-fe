"use client";
import { Button, Typography } from "@/core/ui/components";
import VRPCardList from "./card/VrpCard";
import { vrpData } from "../../constants/vrp-management";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import Link from "next/link";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { useState } from "react";
import { ModalForbidden } from "@/core/ui/container";

const VrpManagement = () => {
  const [showModalForbidden, setShowModalForbidden] = useState(false);
  return (
    <AnimationWrapper className="px-6 pt-12">
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-10">
          <Typography variant="h4" weight="bold">
            VRP Management
          </Typography>
          <VRPCardList data={vrpData} />
          <Button
            variant="secondary-company"
            fullWidth
            onClick={() => setShowModalForbidden(true)}
          >
            + Add New VRP
          </Button>
        </div>
      </Mobile>
      <Desktop>
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
        </div>
      </Desktop>
      <ModalForbidden
        isOpen={showModalForbidden}
        onClose={() => setShowModalForbidden(false)}
        variant="company"
        title="Continue on Desktop"
        subtitle="AddingVRP feature are currently only accessible on the desktop version of our website."
      />
    </AnimationWrapper>
  );
};
export default VrpManagement;
