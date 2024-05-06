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
import { Desktop, Mobile } from "@/core/ui/layout";
import { ModalForbidden } from "@/core/ui/container";
import { useProgramListParamStore } from "@/feature/company/zustand/store/programs";
import { useGetProgramDetails } from "@/feature/company/query/client/useGetProgramDetails";
import { useGetAssetType } from "@/core/react-query/client";
import Thanks from "./_tab/_content/Thanks";
import { currentPhase } from "@/core/constants/common";
import Loader from "@/core/ui/components/loader/loader";

const Overview = ({ id }: { id: string }) => {
  const store = useProgramListParamStore();
  const { data: assetTypes } = useGetAssetType();
  const {
    data: programListDetails,
    isLoading,
    isFetching,
  } = useGetProgramDetails(store.payload, id);
  const [active, setActive] = useState<TabsItem>(TabsItem.rules);
  const [showModalForbidden, setShowModalForbidden] = useState(false);

  const tabs: { [key in TabsItem]: JSX.Element } = {
    rules: <RnP data={programListDetails?.data?.company?.rules} />,
    scope: <Scope id={id} assetTypes={assetTypes} />,
    updates: (
      <UpdateList data={programListDetails?.data?.latest_updates || []} />
    ),
    thanks: <Thanks data={programListDetails?.data?.company?.thanks_message} />,
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
            updates={updates.length}
          />
          <div className="w-full px-6 pb-6">{tabs[active]}</div>
        </div>
        <ModalForbidden
          isOpen={showModalForbidden}
          onClose={() => setShowModalForbidden(false)}
          variant="company"
          title="Continue on Desktop"
          subtitle="AddingVRP feature are currently only accessible on the desktop version of our website."
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
                asLink
                variant="tertiary-company"
                className="py-0"
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
                className="w-full"
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
