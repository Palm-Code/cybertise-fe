"use client";
import { useState } from "react";
import CompaniesDetailHeroCard from "./_card/CompaniesDetailHeroCard";
import {
  collaboratorCardData,
  companyTabsItem,
  vrpCardsData,
  vrpCompaniesCardsData,
} from "@/feature/mediator/constants/vrp-launchpad";
import { companyTabsItemEnums } from "@/enums";
import Tab from "./_tab/Tab";
import VrpCardList from "./_card/VrpCard";
import ActiveTicket from "./_tab/_content/ActiveTicket";
import Collaborators from "./_tab/_content/Collaborators";
import { tableTicketData } from "@/feature/mediator/constants/dashboard";

const CompaniesDetail = () => {
  const [active, setActive] = useState<companyTabsItemEnums>(
    companyTabsItemEnums.vulnerability_program
  );

  const tabs: { [key in companyTabsItemEnums]: JSX.Element } = {
    vulnerability_program: <VrpCardList data={vrpCompaniesCardsData} />,
    active_tickets: <ActiveTicket data={tableTicketData} />,
    thanks: <></>,
    collaborators: <Collaborators data={collaboratorCardData} />,
    activity_logs: <></>,
  };
  return (
    <div className="_flexbox__col__start__start w-full gap-10 py-12">
      <CompaniesDetailHeroCard id="" />
      <div className="_flexbox__col__start__start w-full gap-6">
        <Tab
          items={companyTabsItem}
          active={active}
          onValueChange={(v) => setActive(companyTabsItemEnums[v])}
        />
        {tabs[active]}
      </div>
    </div>
  );
};
export default CompaniesDetail;
