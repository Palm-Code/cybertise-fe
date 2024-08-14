"use client";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { EmptState } from "@/core/ui/layout";
import { TabsItem } from "@/enums";
import Tab from "@/feature/hacker/components/programs/details/_tab/Tab";
import RnP from "@/feature/hacker/components/programs/details/_tab/_content/RnP";
import Scope from "@/feature/hacker/components/programs/details/_tab/_content/Scope";
import Thanks from "@/feature/hacker/components/programs/details/_tab/_content/Thanks";
import UpdateList from "@/feature/hacker/components/programs/details/_tab/_content/Update";
import { programDetailTabItems } from "@/feature/hacker/constants/programs";
import { useState } from "react";

const SingleVrp = ({
  data,
  assetTypes,
}: {
  data?: I_GetProgramDetailsSuccessResponse["data"];
  assetTypes?: I_GetAssetTypeSuccessResponse["data"];
}) => {
  const [active, setActive] = useState<TabsItem>(TabsItem.rules);

  const tabs: { [key in TabsItem]: JSX.Element } = {
    rules: <RnP data={data?.rules ?? null} />,
    scope: <Scope id={data?.id || ""} assetTypes={assetTypes} />,
    updates: <UpdateList data={data?.latest_updates} />,
    // thanks: data?.company?.thanks_message ? (
    //   <Thanks data={data?.company?.thanks_message} />
    // ) : (
    //   <EmptState
    //     type="update"
    //     variant="hacker"
    //     buttonText=""
    //     titleText="You Have No Thanks Message"
    //   />
    // ),
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
