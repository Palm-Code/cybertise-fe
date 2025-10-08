"use client";
import { Button } from "@/core/ui/components";
import VrpDescriptionCard from "./_card/VrpDescriptionCard";
import TargetAssetListCard from "./_card/TargetAssetListCard";
import { useState } from "react";
import { useGetMonetaryAwardData } from "@/core/constants/vrp-launchpad";
import { AnimationWrapper } from "@/core/ui/layout";
import MonetaryAwardCardList from "./_card/MonetaryAwardsCard";
import { SortFilterType } from "@/types/admin/dashboard";
import { Role } from "@/types/admin/sidebar";
import RulesAndPolicies from "../vrp-details-review/_card/RulesAndPolicies";
import { useTranslations } from "next-intl";

interface I_MakeChangesProps {
  onClickNext: () => void;
  onClickPrev: () => void;
  variant?: keyof typeof Role;
  options?: SortFilterType[];
}

const MakeChanges = ({
  onClickNext,
  onClickPrev,
  variant = "mediator",
  options = [],
}: I_MakeChangesProps) => {
  const t = useTranslations("VRPLaunchpad.phase.setup");
  const monetaryAwardData = useGetMonetaryAwardData();
  const [activeElement, setActiveElement] = useState<number>(0);

  const element: Array<React.ReactNode> = [
    <VrpDescriptionCard />,
    <MonetaryAwardCardList
      variant={variant}
      data={monetaryAwardData}
    />,
    <TargetAssetListCard
      options={options}
      onClickPrev={() => {
        if (activeElement === 0) {
          return onClickPrev();
        }
        handleActiveElement(activeElement - 1);
      }}
      onClickNext={() => {
        if (activeElement > element.length - 2) {
          return onClickNext();
        }
        handleActiveElement(activeElement + 1);
      }}
    />,
    <RulesAndPolicies variant={variant} />,
  ];

  const handleActiveElement = (index: number) => {
    setActiveElement(index);
  };

  return (
    <AnimationWrapper key={activeElement}>
      <div className="_flexbox__col__start__start w-full gap-6">
        {element[activeElement]}
        {activeElement !== 2 && (
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
              {t("button_previous")}
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
              {t("button_next")}
            </Button>
          </div>
        )}
      </div>
    </AnimationWrapper>
  );
};
export default MakeChanges;
