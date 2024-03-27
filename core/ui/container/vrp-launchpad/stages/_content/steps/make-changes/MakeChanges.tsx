"use client";
import { Button } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import TargetAssetListCard from "./_card/TargetAssetListCard";
import { useState } from "react";
import { monetaryAwardData } from "@/core/constants/vrp-launchpad";
import { AnimationWrapper } from "@/core/ui/layout";
import MonetaryAwardCardList from "./_card/MonetaryAwardsCard";

interface I_MakeChangesProps {
  onClickNext: () => void;
  onClickPrev: () => void;
  variant?: "mediator" | "company";
}

const MakeChanges = ({
  onClickNext,
  onClickPrev,
  variant = "mediator",
}: I_MakeChangesProps) => {
  const [activeElement, setActiveElement] = useState<number>(0);

  const element: Array<React.ReactNode> = [
    <VrpDescriptionCard />,
    <MonetaryAwardCardList data={monetaryAwardData} />,
    <TargetAssetListCard />,
  ];

  const handleActiveElement = (index: number) => {
    setActiveElement(index);
  };

  return (
    <AnimationWrapper key={activeElement}>
      <div className="_flexbox__col__start__start w-full gap-6">
        {element[activeElement]}
        <div className="_flexbox__row__center gap-8">
          <Button
            variant={`secondary-${variant}`}
            onClick={() => {
              if (activeElement === 0) {
                return onClickPrev();
              }
              handleActiveElement(activeElement - 1);
            }}
          >
            Previous
          </Button>
          <Button
            variant={`primary-${variant}`}
            onClick={() => {
              if (activeElement > element.length - 2) {
                return onClickNext();
              }
              handleActiveElement(activeElement + 1);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </AnimationWrapper>
  );
};
export default MakeChanges;
