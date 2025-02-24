"use client";
import { Button, Card, Typography } from "@/core/ui/components";
import VRPCardList from "./card/VrpCard";
import Link from "next/link";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { useState } from "react";
import { ModalForbidden, VRPCardLoadingList } from "@/core/ui/container";
import { useGetProgramList } from "../../query/client";
import { useProgramListParamStore } from "../../zustand/store/programs";
import { Role } from "@/types/admin/sidebar";
import { cn } from "@/core/lib/utils";
import { useGetRole } from "@/core/hooks";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useTranslations } from "next-intl";

const VrpManagement = () => {
  const t = useTranslations("VRPManagement");
  const role = useGetRole();
  const store = useProgramListParamStore();
  const {
    data: programList,
    isLoading,
    isFetching,
  } = useGetProgramList(store.payload);
  const [showModalForbidden, setShowModalForbidden] = useState(false);

  return (
    <AnimationWrapper className="space-y-0 px-6 pb-28 pt-12 xl:px-0">
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-10">
          <Typography
            variant="h4"
            weight="bold"
          >
            {t("title")}
          </Typography>
          {isLoading || isFetching ? (
            <VRPCardLoadingList />
          ) : programList && programList?.data?.length > 0 ? (
            <VRPCardList
              data={programList?.data}
              variant={role}
            />
          ) : (
            <EmptyState
              variant="company"
              type="program"
              titleText={t("not_found")}
              buttonText={t("button_add_new")}
              href={"/vrp-launchpad/create-vrp"}
            />
          )}
          {role?.toLowerCase() === Role.company && (
            <Button
              variant="secondary-company"
              fullWidth
              onClick={() => setShowModalForbidden(true)}
            >
              {"+ " + t("button_add_new")}
            </Button>
          )}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-10">
          <Card className={cn("rounded-b-none rounded-t-2xl xl:px-9 xl:py-6")}>
            <Typography
              variant="h4"
              weight="bold"
            >
              {t("title")}
            </Typography>
          </Card>
          {isLoading || isFetching ? (
            <VRPCardLoadingList />
          ) : programList && programList?.data?.length ? (
            <VRPCardList
              data={programList?.data}
              variant={role}
            />
          ) : (
            <EmptyState
              variant="company"
              type="program"
              titleText={t("not_found")}
              buttonText={t("button_add_new")}
              href={"/vrp-launchpad/create-vrp"}
            />
          )}
          {programList &&
            role?.toLowerCase() === Role.company &&
            programList?.data?.length > 0 && (
              <Link
                href={"/vrp-launchpad/create-vrp"}
                className="w-full rounded-md border border-brand-neutral px-4 py-6 text-center dark:border-white"
              >
                {"+ " + t("button_add_new")}
              </Link>
            )}
        </div>
      </Desktop>
      <ModalForbidden
        isOpen={showModalForbidden}
        onClose={() => setShowModalForbidden(false)}
        variant="company"
        title={t("forbidden_title")}
        subtitle={t("forbidden_description")}
      />
    </AnimationWrapper>
  );
};
export default VrpManagement;
