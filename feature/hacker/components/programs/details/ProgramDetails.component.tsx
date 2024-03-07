"use client";
import VRPHeroCard from "./_card/VRPHeroCard";
import {
  MultiVrpContainer,
  SingleVrpContainer,
} from "@/feature/hacker/containers";

interface I_ProgramDetailsProps {
  id: string;
}

const ProgramDetails = ({ id }: I_ProgramDetailsProps) => {
  return (
    <div className="_flexbox__col__start__start w-full gap-10 pt-12">
      <VRPHeroCard id={id} />
      <div className="_flexbox__col__start__start w-full gap-4">
        <SingleVrpContainer />
        {/* <MultiVrpContainer /> */}
      </div>
    </div>
  );
};
export default ProgramDetails;
