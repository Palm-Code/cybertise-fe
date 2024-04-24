"use client";
import { useState } from "react";
import CompaniesDetailHeroCard from "./_cards/CompaniesDetailHeroCard";
import { manageCompanyTabsItemEnums } from "@/enums";
import Tab from "./_tab/Tab";
import { manageCompanyTabsItem } from "../../constants/manage-company";
import CompanyDetails from "./_tab/_content/CompanyDetails";
import Staffs from "./_tab/_content/Staffs";
import EmergencyContacs from "./_tab/_content/EmergencyContacs";
import ActivityLogs from "./_tab/_content/ActivityLogs";
import { Card } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";

const ManageCompany = () => {
  const [active, setActive] = useState<manageCompanyTabsItemEnums>(
    manageCompanyTabsItemEnums.company_details
  );

  const tabs: { [key in manageCompanyTabsItemEnums]: JSX.Element } = {
    company_details: <CompanyDetails />,
    staffs: <Staffs />,
    emergency_contact: <EmergencyContacs />,
    activity_logs: <ActivityLogs />,
  };
  return (
    <div className="_flexbox__col__start__start w-full gap-6 pb-12 xl:gap-10 xl:pb-28 xl:pt-12">
      <CompaniesDetailHeroCard id="" />
      <div className="_flexbox__col__start__start w-full gap-6">
        <Tab
          items={manageCompanyTabsItem}
          active={active}
          onValueChange={(v) => setActive(manageCompanyTabsItemEnums[v])}
        />
        <AnimationWrapper key={active}>
          <Card className="w-full bg-transparent pt-2 xl:bg-background-main-light xl:p-8 dark:bg-transparent dark:xl:bg-background-main-dark">
            {tabs[active]}
          </Card>
        </AnimationWrapper>
      </div>
    </div>
  );
};
export default ManageCompany;
