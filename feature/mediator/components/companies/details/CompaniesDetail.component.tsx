"use client";
import { useState } from "react";
import CompaniesDetailHeroCard from "./_card/CompaniesDetailHeroCard";
import { companyTabsItem } from "@/feature/mediator/constants/vrp-launchpad";
import { companyTabsItemEnums } from "@/enums";
import Tab from "./_tab/Tab";
import VrpCardList from "./_card/VrpCard";
import ActiveTicket from "./_tab/_content/ActiveTicket";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useCompaniesDetailParamsStore } from "@/feature/mediator/zustand/store/companies/companies_detail";
import {
  useGetCompaniesDetail,
  useGetProgramList,
} from "@/feature/mediator/query/client";
import Thanks from "./_tab/_content/Thanks";
import { VRPHeroLoading } from "@/core/ui/container";

const CompaniesDetail = ({ id }: { id: string }) => {
  const store = useCompaniesDetailParamsStore();
  const {
    data: companyDetails,
    isLoading,
    isFetching,
  } = useGetCompaniesDetail(store.payload, id);
  const {
    queryDesktop: { data: programList },
  } = useGetProgramList({
    params: {
      filter: {
        company_id: id,
      },
      append: "asset_types",
    },
  });
  const [active, setActive] = useState<companyTabsItemEnums>(
    companyTabsItemEnums.vulnerability_program
  );

  const tabs: { [key in companyTabsItemEnums]: JSX.Element } = {
    vulnerability_program: <VrpCardList data={programList?.data ?? []} />,
    active_tickets: <ActiveTicket id={id} />,
    thanks: companyDetails?.data.thanks_message ? (
      <Thanks data={companyDetails?.data.thanks_message} />
    ) : (
      <EmptyState variant="mediator" type="update" className="mt-0" />
    ),
    // collaborators: <Collaborators data={collaboratorCardData} />,
    // activity_logs: <EmptyState variant="mediator" type="under-construction" />,
  };

  if (isLoading || isFetching) return <VRPHeroLoading variant="mediator" />;

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-6 pb-12">
          <CompaniesDetailHeroCard data={companyDetails?.data} />
          <div className="_flexbox__col__start__start w-full gap-6">
            <Tab
              items={companyTabsItem}
              active={active}
              onValueChange={(v) => setActive(companyTabsItemEnums[v])}
            />
            <div className="_flexbox__col__start__start w-full gap-4 px-6">
              {tabs[active]}
            </div>
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-10 py-12">
          <CompaniesDetailHeroCard data={companyDetails?.data} />
          <div className="_flexbox__col__start__start w-full gap-6">
            <Tab
              items={companyTabsItem}
              active={active}
              onValueChange={(v) => setActive(companyTabsItemEnums[v])}
            />
            {tabs[active]}
          </div>
        </div>
      </Desktop>
    </>
  );
};
export default CompaniesDetail;
