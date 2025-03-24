"use client";
import Image from "next/image";
import {
  AssetTypeTooltip,
  Avatar,
  Badge,
  badgeVariants,
  Card,
  Indicator,
  Separator,
  Tooltip,
  Typography,
} from "../../components";
import { cn } from "@/core/lib/utils";
import { VRPCardType } from "@/types/admin/vrp-launchpad";
import { Desktop, Mobile } from "../../layout";
import { useState } from "react";
import ModalForbiddden from "@/core/ui/container/modals/ModalForbidden";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import { useTranslations } from "next-intl";

interface I_TicketCardProps {
  isGridCard?: boolean;
}

const TicketCard = ({
  isGridCard,
  ...props
}: I_TicketCardProps & I_GetProgramListSuccessResponse["data"][0]) => {
  const t = useTranslations("Programs");
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <Mobile>
        <Card
          isButton
          onClick={() => setShowModal(true)}
        >
          <div className="_flexbox__row__start w-full gap-9">
            <div className={cn("_flexbox__col__start w-full gap-8")}>
              <div className="_flexbox__row__center__between w-full">
                <Badge variant="default">{props.type}</Badge>
                <Indicator
                  variant={
                    props.status.toLowerCase().includes("phase")
                      ? "warning"
                      : "clear"
                  }
                >
                  {props.status}
                </Indicator>
              </div>
              <div className="_flexbox__col__start__start w-full gap-4">
                <div className="grid w-full grid-cols-[auto_1fr] gap-4">
                  <Avatar
                    image={props.company?.logo as string}
                    className="h-8 w-8"
                    initials="C"
                  />
                  <div className="_flexbox__col__start w-full max-w-xl gap-1">
                    {props.title.length > 50 ? (
                      <Tooltip content={props.title}>
                        <Typography
                          variant="p"
                          affects="normal"
                        >
                          {props.title.substring(0, 50) + "..."}
                        </Typography>
                      </Tooltip>
                    ) : (
                      <Typography
                        variant="p"
                        affects="normal"
                      >
                        {props.title}
                      </Typography>
                    )}
                    <Typography
                      variant="p"
                      affects="tiny"
                      weight="light"
                    >
                      {props.company?.name}
                    </Typography>
                  </div>
                </div>
                <Separator orientation="horizontal" />
                <div className="_flexbox__row__center__between w-full">
                  <div className="_flexbox__col__start gap-2.5">
                    <Typography
                      variant="p"
                      affects="small"
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    >
                      {t("asset_type_available")}
                    </Typography>
                    <div className={cn("flex flex-wrap items-center gap-4")}>
                      {props.asset_types
                        ?.map((item, idx) => (
                          <Badge
                            key={`asset_types-${idx}`}
                            variant={item.label as keyof typeof badgeVariants}
                          >
                            {item.value}
                          </Badge>
                        ))
                        .slice(0, 3)}
                      {props.asset_types && props.asset_types.length > 3 && (
                        <AssetTypeTooltip
                          assetTypes={props.asset_types.slice(3)}
                        >
                          <Badge variant="default">
                            +{props.asset_types.length - 3} more
                          </Badge>
                        </AssetTypeTooltip>
                      )}
                    </div>
                  </div>
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
      <Desktop className="h-full">
        <Card
          isClickable
          href={`/vrp-launchpad/${props.id}`}
          className="h-full"
        >
          <div className="_flexbox__row__start w-full gap-9">
            {!isGridCard && (
              <Avatar
                initials="C"
                image={props.company?.logo as string}
                className="h-12 w-12"
              />
            )}
            <div
              className={cn(
                "_flexbox__col__start w-full",
                isGridCard ? "gap-8" : "gap-12"
              )}
            >
              <div className="grid w-full grid-cols-[auto_1fr_auto] gap-4">
                {isGridCard && (
                  <Avatar
                    initials="C"
                    image={props.company?.logo as string}
                    className="h-12 w-12"
                  />
                )}
                <div className="_flexbox__col__start w-full max-w-xl gap-2">
                  {props.title.length > 50 ? (
                    <Tooltip content={props.title}>
                      <Typography
                        variant="p"
                        affects="normal"
                      >
                        {props.title.substring(0, 50) + "..."}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography
                      variant="p"
                      affects="normal"
                    >
                      {props.title}
                    </Typography>
                  )}
                  <div className="_flexbox__row__center gap-4">
                    <Badge variant="default">{props.type}</Badge>
                    <Typography
                      variant="p"
                      affects="tiny"
                    >
                      {props.company?.name}
                    </Typography>
                  </div>
                </div>
                <div className="_flexbox__row__center -mt-7.5 ml-auto gap-4">
                  <Indicator
                    variant={
                      props.status.toLowerCase().includes("phase")
                        ? "warning"
                        : "clear"
                    }
                  >
                    {props.status}
                  </Indicator>
                </div>
              </div>
              <div className="_flexbox__row__center__between w-full">
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    {t("asset_type_available")}
                  </Typography>
                  <div className={cn("flex flex-wrap items-center gap-4")}>
                    {props.asset_types
                      ?.map((item, idx) => (
                        <Badge
                          key={`asset_types-${idx}`}
                          variant={item.label as keyof typeof badgeVariants}
                        >
                          {item.value}
                        </Badge>
                      ))
                      .slice(0, 3)}
                    {props.asset_types && props.asset_types.length > 3 && (
                      <AssetTypeTooltip assetTypes={props.asset_types.slice(3)}>
                        <Badge variant="default">
                          +{props.asset_types.length - 3} more
                        </Badge>
                      </AssetTypeTooltip>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </>
  );
};

interface I_TicketCardListProps {
  data: I_GetProgramListSuccessResponse["data"];
  isGridCard?: boolean;
}

const TicketCardList = ({ data, isGridCard }: I_TicketCardListProps) => {
  return data.map((item, idx) => (
    <TicketCard
      key={`vrp-launchpad-ticket-${idx}`}
      isGridCard={isGridCard}
      {...item}
    />
  ));
};

export default TicketCardList;
