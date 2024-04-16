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
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { I_SettingsFragmentProps } from "../fragments/Settings.fragment";
import { ChevronRight, MoveLeft } from "lucide-react";
import { motion } from "framer-motion";

const Setting = ({ role }: I_SettingsFragmentProps) => {
  const [activeTab, setActiveTab] = useState<SettingItems>(
    SettingItems.details
  );
  const [activeState, setActiveState] = useState<SettingItems | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const tabs: { [key in SettingItems]: JSX.Element } = {
    0: (
      <Details
        variant={role}
        isEditing={editing}
        handleClickEdit={setEditing}
      />
    ),
    1: (
      <Billing
        variant={role}
        isEditing={editing}
        handleClickEdit={setEditing}
      />
    ),
    2: <Notifications variant={role} />,
    3: (
      <Security
        variant={role}
        isEditing={editing}
        handleClickEdit={setEditing}
      />
    ),
    4: <DataPrivacy />,
  };

  return (
    <>
      <Mobile>
        {activeState === null ? (
          <div className="_flexbox__col__start__start w-full gap-8 px-6 py-8">
            <Typography variant="h4" weight="bold">
              Settings
            </Typography>
            <div className="_flexbox__col__start__start w-full gap-4">
              {hackerSettingTabItems.map((item, idx) => (
                <Card
                  key={`item-setting-${idx}`}
                  isButton
                  className="_flexbox__row__center__between w-full rounded-[10px] px-7.5 py-6"
                  onClick={() => setActiveState(idx)}
                >
                  <Typography variant="h4" weight="semibold">
                    {item.label}
                  </Typography>
                  <ChevronRight />
                </Card>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="_flexbox__col__start__start w-full gap-4"
          >
            <Card
              className={cn(
                "sticky top-0 z-50 w-full rounded-none px-6 py-8",
                "_flexbox__col__start__start gap-2.5"
              )}
            >
              <Typography variant="p" affects="small">
                Settings
              </Typography>
              <Typography
                variant="h4"
                weight="bold"
                className="inline-flex items-center gap-2.5"
              >
                <MoveLeft onClick={() => setActiveState(null)} />
                {hackerSettingTabItems[activeState].label}
              </Typography>
            </Card>
            <div className="_flexbox__col__start__start w-full gap-8 px-6 py-8">
              {tabs[activeState]}
            </div>
          </motion.div>
        )}
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start gap-10 pt-12">
          <Typography variant="h4" weight="bold">
            Settings
          </Typography>
          {!editing && (
            <Tab
              items={hackerSettingTabItems}
              variant={role}
              active={activeTab}
              onValueChange={(v) => setActiveTab(v)}
            />
          )}
          <AnimationWrapper key={activeTab}>
            <Card
              className={cn(
                "w-full rounded-xl",
                editing ? "!bg-transparent !p-0" : "xl:px-8 xl:py-12"
              )}
            >
              {tabs[activeTab]}
            </Card>
          </AnimationWrapper>
        </div>
      </Desktop>
    </>
  );
};
export default Setting;
