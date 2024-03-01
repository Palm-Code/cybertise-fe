"use client";
import VRPHeroCard from "./_card/VRPHeroCard";
import { SingleVrpContainer } from "@/feature/hacker/container";

const ProgramDetails = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-10">
      <VRPHeroCard />
      <div className="_flexbox__col__start__start w-full gap-4">
        <SingleVrpContainer />
        {/* <MultiVrpContainer /> */}
      </div>
    </div>
  );
};
export default ProgramDetails;
