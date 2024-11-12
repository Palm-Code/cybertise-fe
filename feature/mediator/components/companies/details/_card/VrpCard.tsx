"use client";
import {
  AssetTypeTooltip,
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
import { Users } from "lucide-react";

type I_VRPCardProps = {
  isCollaborators?: boolean;
  onClickVrp?: (id: string) => void;
};

const VRPCard = ({
  id,
  title,
  asset_types,
  company_id,
  isCollaborators = false,
  onClickVrp = () => {},
  status,
  type,
  collaborators_count,
}: I_VRPCardProps & I_GetProgramListSuccessResponse["data"][0]) => {
  const t = useTranslations("Programs");
  const [showModal, setShowModal] = useState(false);
  return (
    <AnimationWrapper className="h-full">
      <Mobile className="h-full">
        <Card
          isButton={!isCollaborators}
          isClickable={isCollaborators}
          onClick={() => (isCollaborators ? undefined : setShowModal(true))}
          href={`${company_id}/collaborators?program=${id}`}
          className="h-full"
        >
          <div className="_flexbox__col__start__start h-full w-full gap-4">
            <div className="flex w-full items-center justify-between">
              {type.toLowerCase() === "private" && (
                <Badge variant="default">{type}</Badge>
              )}
              {isCollaborators && (
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-[auto_1fr] items-center gap-2.5">
                    <Users
                      size={16}
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    />
                    <Typography variant="p" affects="small" weight="semibold">
                      {collaborators_count}
                    </Typography>
                  </div>
                </div>
              )}
            </div>
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
          isClickable
          href={
            isCollaborators
              ? `${company_id}/collaborators?program=${id}`
              : `/vrp-launchpad/${id}`
          }
        >
          <div className="_flexbox__col__start__start w-full gap-12">
            <div className="_flexbox__row__center__between w-full">
              <div className="grid grid-cols-[1fr_auto] items-center gap-6">
                <Typography variant="p" affects="large" weight="semibold">
                  {title}
                </Typography>
                {type.toLowerCase() === "private" && (
                  <Badge variant="default">{type}</Badge>
                )}
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
                    <AssetTypeTooltip assetTypes={asset_types.slice(3)}>
                      <Badge variant={"default"}>
                        +{asset_types.length - 3} more
                      </Badge>
                    </AssetTypeTooltip>
                  )}
                </div>
              </div>
              {isCollaborators && (
                <div className="flex flex-col gap-2.5">
                  <div className="grid grid-cols-[auto_1fr] items-center gap-2.5">
                    <Users
                      size={16}
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    />
                    <Typography
                      variant="p"
                      affects="small"
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    >
                      {t("collaborators")}
                    </Typography>
                  </div>
                  <Typography variant="p" affects="small" weight="semibold">
                    {collaborators_count} {t("collaborators")}
                  </Typography>
                </div>
              )}
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
