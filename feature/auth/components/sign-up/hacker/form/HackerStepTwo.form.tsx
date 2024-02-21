"use client";
import Button from "@/core/ui/components/button";
import { StepWrapper } from "@/core/ui/layout";

interface I_HackerStepTwoProps {
  onClickNext: () => void;
}

const HackerStepTwo = ({ onClickNext }: I_HackerStepTwoProps) => {
  return (
    <StepWrapper
      currentSteps={1}
      totalSteps={5}
      title="Hacker Sign Up"
      subtitle="Hacker Details"
    >
      <Button fullWidth onClick={onClickNext}>
        Next to Step 3
      </Button>
    </StepWrapper>
  );
};
export default HackerStepTwo;
