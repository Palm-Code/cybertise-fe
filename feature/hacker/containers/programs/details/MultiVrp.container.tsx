"use client";
import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import RnPCard from "@/feature/hacker/components/programs/details/_tab/_content/RnP";
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
      <Mobile className="block space-y-6">
        <div>
          {expand && (
            <Card className="rounded-none px-6 py-4">
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
            items={
              !expand ? programDetailTabMultipleItems : programDetailTabItems
            }
            active={!expand ? "vulnerability" : "rules"}
            onValueChange={() => {}}
          />
        </div>
        {expand ? (
          <RnPCard data={null} />
        ) : (
          <VRPCard onClickSeeDetails={() => setExpand(true)} />
        )}
      </Mobile>
      <Desktop className="block space-y-10">
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
          items={
            !expand ? programDetailTabMultipleItems : programDetailTabItems
          }
          active={!expand ? "vulnerability" : "rules"}
          onValueChange={() => {}}
        />
        {expand ? (
          <RnPCard data={null} />
        ) : (
          <VRPCard onClickSeeDetails={() => setExpand(true)} />
        )}
      </Desktop>
    </AnimationWrapper>
  );
};
export default MultiVrp;
