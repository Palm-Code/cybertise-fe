import { cn } from "@/core/lib/utils";
import IndicatorSteps from "./_indicator/Indicator.steps";
import Setup from "./stages/setup-phase/Setup.stages";
import VRPHeroCard from "@/core/ui/container/vrp-launchpad/_card/VRPHeroCard";
import { AnimationWrapper } from "../../layout";
import VRPCreation from "./stages/vrp-creation/VrpCreation.stages";
import VRPDetails from "./stages/vrp-details/VrpDetails.stages";

interface I_CreateVrpLaunchpadProps {
  variant: "mediator" | "company";
  currentStep?: string;
}

const CreateVrpLaunchpad = ({
  variant,
  currentStep = "Phase1",
}: I_CreateVrpLaunchpadProps) => {
  const currentSteps = (curr: string) => {
    switch (curr) {
      case "Phase2":
        return {
          currentSteps: 2,
          element: <Setup variant={variant} />,
        };
      case "Phase3":
        return {
          currentSteps: 3,
          element: <VRPDetails currentStep={"Phase3"} variant={variant} />,
        };
      case "Phase4":
        return {
          currentSteps: 4,
          element: <Setup variant={variant} />,
        };
      case "Phase5":
        return {
          currentSteps: 5,
          element: <Setup variant={variant} />,
        };
      default:
        return {
          currentSteps: 1,
          element: <VRPCreation variant={variant} />,
        };
    }
  };
  return (
    <>
      <div
        className={cn(
          "_flexbox__col__start__start sticky top-0 z-30",
          "h-fit w-full gap-3 bg-background-page-light dark:bg-background-page-dark"
        )}
      >
        <AnimationWrapper>
          <div className={cn("sticky top-[8.15rem] z-30 h-12 w-full")}></div>
        </AnimationWrapper>
        <VRPHeroCard phase={currentStep} variant={variant} />
        <IndicatorSteps
          currentSteps={currentSteps(currentStep).currentSteps}
          variant={variant}
        />
      </div>
      {currentSteps(currentStep).element}
    </>
  );
};
export default CreateVrpLaunchpad;
