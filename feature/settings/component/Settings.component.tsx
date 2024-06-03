"use client";
import { cn } from "@/core/lib/utils";
import { Card, Loader, Typography } from "@/core/ui/components";
import Tab from "./_tabs/SettingTab";
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
import { settingTabItems } from "../constants";
import { FormProvider, useForm } from "react-hook-form";
import {
  I_UpdateProfile,
  updatePorfileSchema,
} from "@/core/models/company/settings";
import { zodResolver } from "@hookform/resolvers/zod";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";

const Setting = ({
  role,
  initialData,
}: I_SettingsFragmentProps & {
  initialData?: I_GetUserProfileSuccessResponse["data"];
}) => {
  const [activeTab, setActiveTab] = useState<SettingItems>(
    SettingItems.details
  );
  const [activeState, setActiveState] = useState<SettingItems | null>(null);
  const [editing, setEditing] = useState<boolean>(false);

  const methods = useForm<I_UpdateProfile>({
    resolver: zodResolver(updatePorfileSchema),
    defaultValues: {
      username: initialData?.username,
      name: initialData?.name,
      about: initialData?.about,
      address: initialData?.address,
      address_2: initialData?.address_2 || "",
      state: initialData?.state,
      city: initialData?.city,
      country_code: initialData?.country_code,
      email: initialData?.email,
      phone: initialData?.phone,
      want_news: initialData?.want_news,
      website: initialData?.website,
      zip: initialData?.zip,
      logo: initialData?.image,
    },
  });

  const tabs: { [key in SettingItems]: JSX.Element } = {
    [SettingItems.details]: (
      <Details
        data={initialData}
        variant={role}
        isEditing={editing}
        handleClickEdit={setEditing}
      />
    ),
    [SettingItems.billings]: (
      <Billing
        data={initialData}
        variant={role}
        isEditing={editing}
        handleClickEdit={setEditing}
      />
    ),
    [SettingItems.notifications]: (
      <Notifications data={initialData} variant={role} />
    ),
    [SettingItems.security]: (
      <Security
        variant={role}
        isEditing={editing}
        handleClickEdit={setEditing}
      />
    ),
    [SettingItems.data_privacy]: <DataPrivacy />,
  };

  return (
    <FormProvider {...methods}>
      <Mobile>
        {activeState === null ? (
          <div className="_flexbox__col__start__start w-full gap-8 px-6 py-8">
            <Typography variant="h4" weight="bold">
              Settings
            </Typography>
            <div className="_flexbox__col__start__start w-full gap-4">
              {settingTabItems[role].map((item, idx) => (
                <Card
                  key={`item-setting-${idx}`}
                  isButton
                  className="_flexbox__row__center__between w-full rounded-[10px] px-7.5 py-6"
                  onClick={() => setActiveState(item.value as SettingItems)}
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
                className="inline-flex items-center gap-2.5 capitalize"
              >
                <MoveLeft onClick={() => setActiveState(null)} />
                {activeState}
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
              items={settingTabItems[role]}
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
    </FormProvider>
  );
};
export default Setting;
