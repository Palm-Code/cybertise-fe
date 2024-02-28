"use client";
import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import RnPCard from "@/feature/hacker/components/programs/details/_card/RnPCard";
import VRPCard from "@/feature/hacker/components/programs/details/_card/VrpCard";
import Tab from "@/feature/hacker/components/programs/details/_tab/Tab";
import {
  programDetailTabItems,
  programDetailTabMultipleItems,
} from "@/feature/hacker/constants/programs";
import { MoveLeft } from "lucide-react";
import { useState } from "react";

const MultiVrp = () => {
  const [expand, setExpand] = useState<boolean>(false);
  return (
    <AnimationWrapper>
      {expand && (
        <Card className="rounded-2xl rounded-b-none px-8 py-6">
          <Typography
            variant="h5"
            weight="bold"
            className="inline-flex cursor-pointer items-center gap-5"
            onClick={() => setExpand(false)}
          >
            <MoveLeft />
            VRP Title 1
          </Typography>
        </Card>
      )}
      <Tab
        items={!expand ? programDetailTabMultipleItems : programDetailTabItems}
        active={!expand ? "vulnerability" : "rules"}
        onValueChange={() => {}}
      />
      {expand ? (
        <RnPCard />
      ) : (
        <VRPCard onClickSeeDetails={() => setExpand(true)} />
      )}
    </AnimationWrapper>
  );
};
export default MultiVrp;
