"use client";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { EmptState } from "@/core/ui/layout";
import { TabsItem } from "@/enums";
import Tab from "@/feature/hacker/components/programs/details/_tab/Tab";
import RnP from "@/feature/hacker/components/programs/details/_tab/_content/RnP";
import Scope from "@/feature/hacker/components/programs/details/_tab/_content/Scope";
import Summary from "@/feature/hacker/components/programs/details/_tab/_content/Summary";
import Thanks from "@/feature/hacker/components/programs/details/_tab/_content/Thanks";
import UpdateList from "@/feature/hacker/components/programs/details/_tab/_content/Update";
import { useGetProgramDetailsTabItems } from "@/feature/hacker/constants/programs";
import { useState } from "react";

const SingleVrp = ({
  data,
  assetTypes,
}: {
  data?: I_GetProgramDetailsSuccessResponse["data"];
  assetTypes?: I_GetAssetTypeSuccessResponse["data"];
}) => {
  const programDetailTabItems = useGetProgramDetailsTabItems();
  const [active, setActive] = useState<TabsItem>(TabsItem.summary);

  const summary: CreateVrpType = {
    title: data?.title || "",
    type: data?.type || "",
    status: data?.status || "",
    rules: data?.rules || "",
    policies: data?.policies || "",
    target_assets: data?.target_assets || [],
    monetary_awards_critical: data?.monetary_awards_critical || 0,
    monetary_awards_high: data?.monetary_awards_high || 0,
    monetary_awards_medium: data?.monetary_awards_medium || 0,
    monetary_awards_low: data?.monetary_awards_low || 0,
    monetary_awards_level: data?.monetary_awards_level || "",
    asset_types_values: data?.asset_types || [],
    description: data?.description || "",
    notes: data?.notes || "",
  };

  const tabs: { [key in TabsItem]: JSX.Element } = {
    summary: <Summary type="details" data={summary} />,
    rules: <RnP data={data?.rules ?? null} />,
    bounty: <Summary type="bounty" data={summary} />,
    scope: <Scope id={data?.id || ""} assetTypes={assetTypes} />,
    updates: <UpdateList data={data?.latest_updates} />,
    thanks: data?.company?.thanks_message ? (
      <Thanks data={data?.company?.thanks_message} />
    ) : (
      <EmptState type="update" variant="hacker" buttonText="" />
    ),
  };
  return (
    <>
      <Tab
        items={programDetailTabItems}
        active={active}
        onValueChange={(v) => setActive(TabsItem[v])}
        updates={data?.latest_updates?.length}
      />
      <div className="w-full pb-12">{tabs[active]}</div>
    </>
  );
};
export default SingleVrp;
