"use client";
import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import Tab from "./_tabs/SettingTab";
import { hackerSettingTabItems } from "../constants";
import { useState } from "react";
import { SettingItems } from "@/enums";
import {
  Billing,
  DataPrivacy,
  Details,
  Notifications,
  Security,
} from "../containers";
import { AnimationWrapper } from "@/core/ui/layout";
import { I_SettingsFragmentProps } from "../fragments/Settings.fragment";

const Setting = ({ role }: I_SettingsFragmentProps) => {
  const [activeTab, setActiveTab] = useState<SettingItems>(
    SettingItems.details
  );

  const tabs: { [key in SettingItems]: JSX.Element } = {
    details: <Details />,
    billings: <Billing />,
    notifications: <Notifications />,
    security: <Security />,
    data_privacy: <DataPrivacy />,
  };

  return (
    <div className="_flexbox__col__start__start gap-10">
      <Typography variant="h4" weight="bold">
        Settings
      </Typography>
      <Tab
        items={hackerSettingTabItems}
        variant={role}
        active={activeTab}
        onValueChange={(v) => setActiveTab(SettingItems[v])}
      />
      <AnimationWrapper key={activeTab}>
        <Card
          className={cn(
            "w-full rounded-xl px-8 py-12",
            "_flexbox__col__start__start gap-6"
          )}
        >
          {tabs[activeTab]}
        </Card>
      </AnimationWrapper>
    </div>
  );
};
export default Setting;
