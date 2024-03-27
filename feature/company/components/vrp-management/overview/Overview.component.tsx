"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card, Indicator, Typography } from "@/core/ui/components";
import { FilePenLine, MoveLeft } from "lucide-react";
import Link from "next/link";
import Tab from "./_tab/Tab";
import {
  programDetailTabItems,
  updates,
} from "@/feature/company/constants/vrp-management";
import { useState } from "react";
import { TabsItem } from "@/enums";
import RnP from "./_tab/_content/RnP";
import Scope from "./_tab/_content/Scope";
import UpdateList from "./_tab/_content/Update";

const Overview = () => {
  const [active, setActive] = useState<TabsItem>(TabsItem.rules);

  const tabs: { [key in TabsItem]: JSX.Element } = {
    rules: <RnP />,
    scope: <Scope />,
    updates: <UpdateList data={updates} />,
    thanks: <RnP />,
  };
  return (
    <div className="_flexbox__col__start__start w-full gap-8 pt-12">
      <Card
        className={cn(
          "rounded-2xl rounded-b-none px-8 py-6",
          "_flexbox__row__center__between w-full"
        )}
      >
        <Typography
          variant="h5"
          weight="bold"
          className="inline-flex items-center gap-5"
        >
          <Link href="/vrp-launchpad">
            <MoveLeft />
          </Link>
          VRP Title 1
        </Typography>
        <div className="_flexbox__row__center gap-6">
          <Button
            asLink
            variant="tertiary-company"
            prefixIcon={<FilePenLine />}
            href={`/vrp-launchpad/${1}`}
          >
            Edit VRP
          </Button>
          <Indicator variant="warning">Status</Indicator>
        </div>
      </Card>
      <Tab
        items={programDetailTabItems}
        active={active}
        onValueChange={(v) => setActive(TabsItem[v])}
        updates={updates.length}
      />
      {tabs[active]}
    </div>
  );
};
export default Overview;
