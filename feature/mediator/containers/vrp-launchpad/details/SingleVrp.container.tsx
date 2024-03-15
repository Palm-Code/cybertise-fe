"use client";
import { TabsItem } from "@/enums";
import Tab from "@/feature/hacker/components/programs/details/_tab/Tab";
import RnP from "@/feature/hacker/components/programs/details/_tab/_content/RnP";
import Scope from "@/feature/hacker/components/programs/details/_tab/_content/Scope";
import UpdateList from "@/feature/hacker/components/programs/details/_tab/_content/Update";
import {
  programDetailTabItems,
  updates,
} from "@/feature/hacker/constants/programs";
import { useState } from "react";

const SingleVrp = () => {
  const [active, setActive] = useState<TabsItem>(TabsItem.rules);

  const tabs: { [key in TabsItem]: JSX.Element } = {
    rules: <RnP />,
    scope: <Scope />,
    updates: <UpdateList data={updates} />,
    thanks: <RnP />,
  };
  return (
    <>
      <Tab
        items={programDetailTabItems}
        active={active}
        onValueChange={(v) => setActive(TabsItem[v])}
        updates={updates.length}
      />
      {tabs[active]}
    </>
  );
};
export default SingleVrp;
