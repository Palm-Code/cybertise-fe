"use client";
import { useState } from "react";
import CompaniesDetailHeroCard from "./_cards/CompaniesDetailHeroCard";
import { manageCompanyTabsItemEnums } from "@/enums";
import Tab from "./_tab/Tab";
import { useManageCompanyTabsItem } from "../../constants/manage-company";
import CompanyDetails from "./_tab/_content/CompanyDetails";
import Staffs from "./_tab/_content/Staffs";
import EmergencyContacs from "./_tab/_content/EmergencyContacs";
import ActivityLogs from "./_tab/_content/ActivityLogs";
import { Card } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import { useGetUserProfile } from "@/core/react-query/client";
import { VRPHeroLoading } from "@/core/ui/container";
import { useSearchParams } from "next/navigation";
import EditState from "./EditState";

export enum editStaff {
  add_staff = "add_staff",
}

const ManageCompany = () => {
  const searchParams = useSearchParams();
  const state = searchParams.get("edit") as manageCompanyTabsItemEnums &
    editStaff;
  const manageCompanyTabsItem = useManageCompanyTabsItem();
  const { data: companyData, isLoading, isFetching } = useGetUserProfile();
  const [active, setActive] = useState<manageCompanyTabsItemEnums>(
    manageCompanyTabsItemEnums.company_details
  );

  const tabs: { [key in manageCompanyTabsItemEnums]: JSX.Element } = {
    company_details: <CompanyDetails data={companyData?.data} />,
    staffs: <Staffs data={companyData?.data.staff} />,
    emergency_contact: <EmergencyContacs data={companyData?.data} />,
    activity_logs: <ActivityLogs />,
  };

  if (isLoading || isFetching) return <VRPHeroLoading variant="company" />;
  if (state) return <EditState state={state} data={companyData?.data} />;
  return (
    <div className="_flexbox__col__start__start w-full gap-6 pb-12 xl:gap-10 xl:pb-28 xl:pt-12">
      <CompaniesDetailHeroCard data={companyData?.data} />
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
