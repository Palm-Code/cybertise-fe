import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import MonetaryAwardsCard from "@/core/ui/container/vrp-launchpad/stages/_content/steps/vrp-details-review/_card/MonetaryAwardsCard";
import RulesAndPolicies from "@/core/ui/container/vrp-launchpad/stages/_content/steps/vrp-details-review/_card/RulesAndPolicies";
import RulesAndPoliciesReview from "@/core/ui/container/vrp-launchpad/stages/_content/steps/vrp-details-review/_card/RulesAndPoliciesReview";
import TargetAssetListCard from "@/core/ui/container/vrp-launchpad/stages/_content/steps/vrp-details-review/_card/TargetAssetListCard";
import VrpDescriptionCard from "@/core/ui/container/vrp-launchpad/stages/_content/steps/vrp-details-review/_card/VrpDescriptionCard";
import React from "react";

type SummaryProps = {
  data: CreateVrpType;
  type: "details" | "bounty";
};
const Summary = ({ data, type = "details" }: SummaryProps) => {
  const types = {
    details: (
      <>
        <VrpDescriptionCard data={data} />
        <MonetaryAwardsCard data={data} />
        <RulesAndPoliciesReview data={data} />
        <TargetAssetListCard data={data} />
      </>
    ),
    bounty: <MonetaryAwardsCard data={data} />,
  };

  return (
    <div
      className={cn(
        "w-full bg-background-main-light dark:bg-background-main-dark",
        "flex flex-col gap-6 rounded-xl p-6 xl:p-8"
      )}
    >
      {types[type]}
    </div>
  );
};

export default Summary;
