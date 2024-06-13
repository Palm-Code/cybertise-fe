"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card, Indicator, Typography } from "@/core/ui/components";
import { FilePenLine, MoveLeft } from "lucide-react";
import Link from "next/link";
import Tab from "./_tab/Tab";
import { programDetailTabItems } from "@/feature/company/constants/vrp-management";
import { useState } from "react";
import { TabsItem } from "@/enums";
import RnP from "./_tab/_content/RnP";
import Scope from "./_tab/_content/Scope";
import UpdateList from "./_tab/_content/Update";
import { Desktop, Mobile } from "@/core/ui/layout";
import { ModalForbidden } from "@/core/ui/container";
import { useProgramListParamStore } from "@/feature/company/zustand/store/programs";
import { useGetProgramDetails } from "@/feature/company/query/client/useGetProgramDetails";
import { useGetAssetType } from "@/core/react-query/client";
import Thanks from "./_tab/_content/Thanks";
import { currentPhase } from "@/core/constants/common";
import Loader from "@/core/ui/components/loader/loader";
import { useGetRole } from "@/core/hooks";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

const Overview = ({ id }: { id: string }) => {
  const store = useProgramListParamStore();
  const role = useGetRole();
  const { data: assetTypes } = useGetAssetType();
  const {
    data: programListDetails,
    isLoading,
    isFetching,
  } = useGetProgramDetails(store.payload, id);
  const [active, setActive] = useState<TabsItem>(TabsItem.rules);
  const [showModalForbidden, setShowModalForbidden] = useState(false);

  const tabs: { [key in TabsItem]: JSX.Element } = {
    rules: <RnP data={programListDetails?.data?.rules || "-"} />,
    scope: <Scope id={id} assetTypes={assetTypes} />,
    updates: (
      <UpdateList
        id={id}
        data={programListDetails?.data?.latest_updates || []}
      />
    ),
    thanks: programListDetails?.data?.company?.thanks_message ? (
      <Thanks data={programListDetails?.data?.company?.thanks_message} />
    ) : (
      <EmptyState
        titleText="You Have No Thanks Message"
        variant="company"
        type="update"
        buttonText=""
      />
    ),
  };

  if (isLoading || isFetching) return <Loader variant="company" />;

  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-8">
          <Card
            className={cn(
              "rounded-none px-6 py-8",
              "_flexbox__col__start__start w-full gap-8"
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
              {programListDetails?.data?.title}
            </Typography>
            <Indicator
              variant={
                programListDetails?.data.status?.toLowerCase().includes("phase")
                  ? "open"
                  : "clear"
              }
            >
              {`${programListDetails?.data.status} ${programListDetails?.data.status?.toLowerCase().includes("phase") ? `: ${currentPhase[programListDetails?.data.status?.toLowerCase()]}` : ""}`}
            </Indicator>
            <Button
              variant="secondary-company"
              fullWidth
              prefixIcon={<FilePenLine />}
              onClick={() => setShowModalForbidden(true)}
            >
              Edit VRP
            </Button>
          </Card>
          <Tab
            items={programDetailTabItems}
            active={active}
            onValueChange={(v) => setActive(TabsItem[v])}
            updates={programListDetails?.data?.latest_updates?.length || 0}
          />
          <div className="w-full px-6 pb-6">{tabs[active]}</div>
        </div>
        <ModalForbidden
          isOpen={showModalForbidden}
          onClose={() => setShowModalForbidden(false)}
          variant="company"
          title="Continue on Desktop"
          subtitle="Adding VRP feature are currently only accessible on the desktop version of our website."
        />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-8 pb-28 pt-12">
          <Card
            className={cn(
              "rounded-2xl rounded-b-none xl:p-6",
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
              {programListDetails?.data?.title}
            </Typography>
            <div className="_flexbox__row__center gap-6">
              <Button
                asLink={role !== "company staff"}
                variant="tertiary-company"
                className="py-0"
                disabled={role === "company staff"}
                prefixIcon={<FilePenLine />}
                href={`/vrp-launchpad/${id}`}
              >
                Edit VRP
              </Button>
              <Indicator
                variant={
                  programListDetails?.data.status
                    ?.toLowerCase()
                    .includes("phase")
                    ? "open"
                    : "clear"
                }
              >
                {`${programListDetails?.data.status} ${programListDetails?.data.status?.toLowerCase().includes("phase") ? `: ${currentPhase[programListDetails?.data.status?.toLowerCase()]}` : ""}`}
              </Indicator>
            </div>
          </Card>
          <Tab
            items={programDetailTabItems}
            active={active}
            onValueChange={(v) => setActive(TabsItem[v])}
            updates={programListDetails?.data?.latest_updates?.length}
          />
          {tabs[active]}
        </div>
      </Desktop>
    </>
  );
};
export default Overview;
