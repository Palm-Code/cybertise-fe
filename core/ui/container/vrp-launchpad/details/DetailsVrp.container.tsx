import { cn } from "@/core/lib/utils";
import Setup from "../stages/setup-phase/Setup.stages";
import { AnimationWrapper } from "@/core/ui/layout";
import VRPHeroCard from "../_card/VRPHeroCard";
import IndicatorSteps from "../_indicator/Indicator.steps";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import VRPDetails from "../stages/vrp-details/VrpDetails.stages";
import VRPCreation from "../stages/vrp-creation/VrpCreation.stages";
import { Role } from "@/types/admin/sidebar";

interface I_DetailsVrpLaunchpadProps {
  variant?: keyof typeof Role;
  currentStep?: string;
  initialData?: I_GetProgramDetailsSuccessResponse["data"];
}

const DetailsVrpLaunchpad = ({
  variant = "mediator",
  currentStep = "Phase1",
  initialData,
}: I_DetailsVrpLaunchpadProps) => {
  const currentSteps = (curr: string) => {
    switch (curr) {
      case "Phase2":
        return {
          currentSteps: 2,
          element: (
            <Setup
              initialData={initialData}
              variant={variant}
              currentStep={currentStep}
            />
          ),
        };
      case "Phase3":
        return {
          currentSteps: 3,
          element: (
            <VRPDetails
              initialValues={initialData}
              currentStep={currentStep}
              variant={variant}
            />
          ),
        };
      case "Phase4":
        return {
          currentSteps: 4,
          element: (
            <Setup
              currentStep={currentStep}
              initialData={initialData}
              variant={variant}
            />
          ),
        };
      case "Phase5":
        return {
          currentSteps: 5,
          element: (
            <VRPDetails
              initialValues={initialData}
              currentStep={currentStep}
              variant={variant}
            />
          ),
        };
      case "Published":
        return {
          currentSteps: 5,
          element: (
            <VRPDetails
              initialValues={initialData}
              currentStep={currentStep}
              variant={variant}
            />
          ),
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
          "_flexbox__col__start__start sticky top-0 z-40",
          "h-fit w-full gap-3 bg-background-page-light dark:bg-background-page-dark"
        )}
      >
        <AnimationWrapper>
          <div className={cn("sticky top-[8.15rem] z-30 h-12 w-full")}></div>
        </AnimationWrapper>
        <VRPHeroCard
          initialData={initialData}
          phase={currentStep}
          variant={variant}
        />
        <IndicatorSteps
          currentSteps={currentSteps(currentStep).currentSteps}
          variant={variant}
        />
      </div>
      {currentSteps(currentStep).element}
    </>
  );
};
export default DetailsVrpLaunchpad;
