"use client";
import { useState } from "react";
import CompaniesDetailHeroCard from "./_card/CompaniesDetailHeroCard";
import {
  collaboratorCardData,
  useCompanyTabsItem,
} from "@/feature/mediator/constants/vrp-launchpad";
import { companyTabsItemEnums } from "@/enums";
import Tab from "./_tab/Tab";
import VrpCardList from "./_card/VrpCard";
import ActiveTicket from "./_tab/_content/ActiveTicket";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useCompaniesDetailParamsStore } from "@/feature/mediator/zustand/store/companies/companies_detail";
import {
  useGetCompaniesDetail,
  useGetProgramList,
} from "@/feature/mediator/query/client";
import { VRPCardLoadingList, VRPHeroLoading } from "@/core/ui/container";
import Collaborators from "./_tab/_content/Collaborators";
import { cn } from "@/core/lib/utils";
import { useInView } from "react-intersection-observer";

const CompaniesDetail = ({ id }: { id: string }) => {
  const companyTabsItem = useCompanyTabsItem();
  const store = useCompaniesDetailParamsStore();
  const {
    data: companyDetails,
    isLoading,
    isFetching,
    isRefetching,
  } = useGetCompaniesDetail(store.payload, id);
  const [programType, setProgramType] = useState<string | undefined>();
  const {
    queryMobile: {
      data: programs,
      isFetchingNextPage,
      isFetching: isFetchingPrograms,
      fetchNextPage,
    },
  } = useGetProgramList(
    {
      params: {
        filter: {
          company_id: id,
          type: programType,
        },
        include: "collaboratorsCount",
        append: "asset_types",
      },
    },
    true
  );

  const { ref } = useInView({
    onChange: (inView) => {
      if (inView) {
        setTimeout(() => {
          fetchNextPage();
        }, 200);
      }
    },
  });

  const programListDesktop = programs?.pages.map((page) => page.data).flat();

  const filteredPorgramList = programListDesktop?.filter(
    (item) => item.status === "Published"
  );
  const [active, setActive] = useState<companyTabsItemEnums>(
    companyTabsItemEnums.vulnerability_program
  );

  const tabs: { [key in companyTabsItemEnums]: JSX.Element } = {
    vulnerability_program: <VrpCardList data={filteredPorgramList ?? []} />,
    active_tickets: <ActiveTicket id={id} />,
    // thanks: companyDetails?.data.thanks_message ? (
    //   <Thanks data={companyDetails?.data.thanks_message} />
    // ) : (
    //   <EmptyState variant="mediator" type="update" className="mt-0" />
    // ),
    collaborators: <Collaborators data={filteredPorgramList ?? []} />,
    // activity_logs: <EmptyState variant="mediator" type="under-construction" />,
  };

  if (isLoading || isFetching || isRefetching)
    return <VRPHeroLoading variant="mediator" />;

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-6 pb-12">
          <CompaniesDetailHeroCard data={companyDetails?.data} />
          <div className="_flexbox__col__start__start w-full gap-6">
            <Tab
              items={companyTabsItem}
              active={active}
              onValueChange={(v) => {
                setActive(companyTabsItemEnums[v]);
                if (v === "collaborators") {
                  setProgramType("private");
                  return;
                }
                setProgramType(undefined);
              }}
            />
            <div
              className={cn(
                "_flexbox__col__start__start w-full grid-cols-2 gap-4 px-6",
                {
                  "md:grid":
                    (active !== "active_tickets" &&
                      programs?.pages[0].meta?.total) ??
                    0 > 1,
                }
              )}
            >
              {isFetchingPrograms &&
              !isFetchingNextPage &&
              active !== "active_tickets" ? (
                <VRPCardLoadingList count={10} />
              ) : (
                tabs[active]
              )}
              {active === "vulnerability_program" ||
              active === "collaborators" ? (
                <div
                  ref={ref}
                  className={cn("w-full space-y-6")}
                >
                  {isFetchingNextPage && <VRPCardLoadingList count={3} />}
                </div>
              ) : null}
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
              onValueChange={(v) => {
                setActive(companyTabsItemEnums[v]);
                if (v === "collaborators") {
                  setProgramType("private");
                  return;
                }
                setProgramType(undefined);
              }}
            />
            {isFetchingPrograms &&
            !isFetchingNextPage &&
            active !== "active_tickets" ? (
              <VRPCardLoadingList count={10} />
            ) : (
              tabs[active]
            )}
            {active === "vulnerability_program" ||
            active === "collaborators" ? (
              <div
                ref={ref}
                className={cn("w-full space-y-6")}
              >
                {isFetchingNextPage && <VRPCardLoadingList count={3} />}
              </div>
            ) : null}
          </div>
        </div>
      </Desktop>
    </>
  );
};
export default CompaniesDetail;
