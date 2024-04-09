"use client";
import { Desktop, Mobile } from "@/core/ui/layout";
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
    <>
      <Mobile>
        <div className="_flexbox__col__start__start w-full">
          <VRPHeroCard id={id} />
          <div className="_flexbox__col__start__start w-full gap-4">
            <SingleVrpContainer />
            {/* <MultiVrpContainer /> */}
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-10 pt-12">
          <VRPHeroCard id={id} />
          <div className="_flexbox__col__start__start w-full gap-4">
            {/* <SingleVrpContainer /> */}
            <MultiVrpContainer />
          </div>
        </div>
      </Desktop>
    </>
  );
};
export default ProgramDetails;
