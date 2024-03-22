"use client";
import { Button, Typography } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import MonetaryAwardsCard from "./_card/MonetaryAwardsCard";
import TargetAssetListCard from "./_card/TargetAssetListCard";
import Notes from "../notes/Notes";
import { useState } from "react";
import { monetaryAwardData } from "@/core/constants/vrp-launchpad";

interface I_MakeChangesProps {
  onClickNext: () => void;
  onClickPrev: () => void;
}

const MakeChanges = ({ onClickNext, onClickPrev }: I_MakeChangesProps) => {
  const [activeElement, setActiveElement] = useState<number>(0);

  const element: Array<React.ReactNode> = [
    <VrpDescriptionCard />,
    <MonetaryAwardsCard data={monetaryAwardData} />,
    <TargetAssetListCard />,
  ];

  const handleActiveElement = (index: number) => {
    setActiveElement(index);
  };

  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      {element[activeElement]}
      <div className="_flexbox__row__center gap-8">
        <Button
          variant="secondary-mediator"
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
          variant="primary-mediator"
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
  );
};
export default MakeChanges;
