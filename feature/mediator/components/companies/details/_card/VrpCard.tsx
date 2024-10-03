"use client";
import {
  Badge,
  badgeVariants,
  Card,
  Indicator,
  Separator,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import ModalForbiddden from "@/core/ui/container/modals/ModalForbidden";
import { useState } from "react";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useTranslations } from "next-intl";

type I_VRPCardProps = {};

const VRPCard = ({
  id,
  title,
  asset_types,
  status,
}: I_VRPCardProps & I_GetProgramListSuccessResponse["data"][0]) => {
  const t = useTranslations("Programs");
  const [showModal, setShowModal] = useState(false);
  return (
    <AnimationWrapper>
      <Mobile>
        <Card isButton onClick={() => setShowModal(true)}>
          <div className="_flexbox__col__start__start w-full gap-4">
            <div className="_flexbox__col__start__start w-full gap-4">
              <Typography variant="p" affects="large" weight="semibold">
                {title}
              </Typography>
              <Indicator
                variant={
                  status.includes("Phase")
                    ? "warning"
                    : (status.toLowerCase() as keyof typeof indicatorVariants)
                }
              >
                {status}
              </Indicator>
            </div>
            <Separator orientation="horizontal" />
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography variant="p" affects="small">
                  {t("asset_type_available")}
                </Typography>
                <div className="flex flex-wrap items-center gap-4">
                  {asset_types &&
                    asset_types.map((item, index) => (
                      <Badge
                        key={index}
                        variant={item.label as keyof typeof badgeVariants}
                      >
                        {item.value}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
        <ModalForbiddden
          title="Continue on Desktop"
          subtitle="Creating VRP feature are currently only accessible on the desktop version of our website."
          variant="mediator"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      </Mobile>
      <Desktop>
        <Card isClickable href={`/vrp-launchpad/${id}`}>
          <div className="_flexbox__col__start__start w-full gap-12">
            <div className="_flexbox__row__center__between w-full">
              <Typography variant="p" affects="large" weight="semibold">
                {title}
              </Typography>
              <Indicator
                variant={
                  status.includes("Phase")
                    ? "warning"
                    : (status.toLowerCase() as keyof typeof indicatorVariants)
                }
              >
                {status}
              </Indicator>
            </div>
            <div className="_flexbox__row__center__between w-full">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography variant="p" affects="small">
                  {t("asset_type_available")}
                </Typography>
                <div className="grid grid-flow-col gap-4">
                  {asset_types &&
                    asset_types.slice(0, 3).map((item, index) => (
                      <Badge
                        key={index}
                        variant={item.label as keyof typeof badgeVariants}
                      >
                        {item.value}
                      </Badge>
                    ))}
                  {asset_types && asset_types.length > 3 && (
                    <Tooltip
                      content={asset_types
                        .slice(3)
                        .map((item) => item.value)
                        .join(", ")}
                    >
                      <Badge variant={"default"}>
                        +{asset_types.length - 3} more
                      </Badge>
                    </Tooltip>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </AnimationWrapper>
  );
};

const VrpCardList = ({
  data,
}: {
  data: I_GetProgramListSuccessResponse["data"];
}) => {
  if (!data || data?.length === 0)
    return <EmptyState type="program" variant="mediator" buttonText="" />;
  return data.map((item, index) => <VRPCard key={index} {...item} />);
};

export default VrpCardList;
