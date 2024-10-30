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

type I_VRPCardProps = {
  isCollaborators?: boolean;
  onClickVrp?: (id: string) => void;
};

const VRPCard = ({
  id,
  title,
  asset_types,
  isCollaborators = false,
  onClickVrp = () => {},
  status,
  type,
}: I_VRPCardProps & I_GetProgramListSuccessResponse["data"][0]) => {
  const t = useTranslations("Programs");
  const [showModal, setShowModal] = useState(false);
  return (
    <AnimationWrapper>
      <Mobile>
        <Card
          isButton
          onClick={() =>
            isCollaborators ? onClickVrp(id) : setShowModal(true)
          }
        >
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
        <Card
          isButton={isCollaborators}
          isClickable={!isCollaborators}
          href={`/vrp-launchpad/${id}`}
          onClick={() => (isCollaborators ? onClickVrp(id) : undefined)}
        >
          <div className="_flexbox__col__start__start w-full gap-12">
            <div className="_flexbox__row__center__between w-full">
              <div className="grid grid-cols-[1fr_auto] items-center gap-6">
                <Typography variant="p" affects="large" weight="semibold">
                  {title}
                </Typography>
                <Badge variant="default">{type}</Badge>
              </div>
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
  isCollaborators = false,
  onClickVrp = () => {},
}: {
  data: I_GetProgramListSuccessResponse["data"];
  isCollaborators?: boolean;
  onClickVrp?: (id: string) => void;
}) => {
  if (!data || data?.length === 0)
    return <EmptyState variant="mediator" buttonText="" className="mt-16" />;
  return data.map((item, index) => (
    <VRPCard
      key={index}
      isCollaborators={isCollaborators}
      onClickVrp={onClickVrp}
      {...item}
    />
  ));
};

export default VrpCardList;
