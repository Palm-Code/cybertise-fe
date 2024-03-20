import { cn } from "@/core/lib/utils";
import IndicatorSteps from "./_indicator/Indicator.steps";
import Setup from "./stages/setup-phase/Setup.stages";
import VRPHeroCard from "@/feature/mediator/components/vrp-launcpad/create-vrp/_card/VRPHeroCard";
import { AnimationWrapper } from "../../layout";

interface I_CreateVrpLaunchpadProps {
  id: string;
  variant: "mediator" | "company";
}

const CreateVrpLaunchpad = ({ id, variant }: I_CreateVrpLaunchpadProps) => {
  return (
    <>
      <div
        className={cn(
          "_flexbox__col__start__start sticky top-0 z-30",
          "h-fit w-full gap-3 bg-background-page-light dark:bg-background-page-dark"
        )}
      >
        <AnimationWrapper key={id}>
          <div className={cn("sticky top-[8.15rem] z-30 h-12 w-full")}></div>
        </AnimationWrapper>
        <VRPHeroCard />
        <IndicatorSteps currentSteps={2} variant="mediator" />
      </div>
      <Setup id={id} variant={variant} />
    </>
  );
};
export default CreateVrpLaunchpad;
