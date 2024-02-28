"use client";
import Tab from "./_tab/Tab";
import { programDetailTabItems } from "@/feature/hacker/constants/programs";
import RnPCard from "./_card/RnPCard";
import VRPHeroCard from "./_card/VRPHeroCard";
import VRPCard from "./_card/VrpCard";
import { Card, Typography } from "@/core/ui/components";
import { MoveLeft } from "lucide-react";
import {
  MultiVrpContainer,
  SingleVrpContainer,
} from "@/feature/hacker/container";

const ProgramDetails = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-10">
      <VRPHeroCard />
      <div className="_flexbox__col__start__start w-full gap-4">
        {/* <SingleVrpContainer /> */}
        <MultiVrpContainer />
      </div>
    </div>
  );
};
export default ProgramDetails;
