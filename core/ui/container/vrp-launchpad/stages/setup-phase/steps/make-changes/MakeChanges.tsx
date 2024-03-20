"use client";
import { Button, Typography } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import MonetaryAwardsCard from "./_card/MonetaryAwardsCard";
import TargetAssetListCard from "./_card/TargetAssetListCard";
import Notes from "./_card/Notes";
import { useState } from "react";
import { monetaryAwardData } from "@/core/constants/vrp-launchpad";
import { cn } from "@/core/lib/utils";

interface I_MakeChangesProps {
  onClickNext: () => void;
  onClickPrev: () => void;
}

const MakeChanges = ({ onClickNext, onClickPrev }: I_MakeChangesProps) => {
  const [activeElement, setActiveElement] = useState<number>(0);

  const handleActiveElement = (index: number) => {
    setActiveElement(index);
  };

  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      {activeElement === 0 ? (
        <>
          <Typography variant="h5" weight="bold">
            Review VRP {"Title 1"}
          </Typography>
          <VrpDescriptionCard />
        </>
      ) : (
        <div
          className={cn(
            "w-full rounded-[10px] bg-background-page-light p-7.5 dark:bg-background-page-dark",
            "_flexbox__col__start__start gap-6"
          )}
        >
          <Typography variant="h6" weight="bold">
            Monetary Awards
          </Typography>
          <MonetaryAwardsCard data={monetaryAwardData} />
        </div>
      )}
      <div className="_flexbox__row__center gap-8">
        <Button
          variant="secondary-mediator"
          onClick={() => {
            if (activeElement === 0) {
              return onClickPrev();
            }
            handleActiveElement(0);
          }}
        >
          Previous
        </Button>
        <Button
          variant="primary-mediator"
          onClick={() => {
            if (activeElement === 1) {
              return onClickNext();
            }
            handleActiveElement(1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
export default MakeChanges;
