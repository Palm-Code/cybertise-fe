"use client";
import Image from "next/image";
import { Badge, Button, Card, Indicator, Typography } from "../../components";
import { cn } from "@/core/lib/utils";
import { Suspense, useState } from "react";
import { CardLoader, Desktop, Mobile } from "../../layout";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import { Hacker } from "../../icons";
import { Building2, ChevronRight } from "lucide-react";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard";
import { ModalForbidden } from "..";

interface I_TicketCardProps {
  isGridCard?: boolean;
  isMediator?: boolean;
}

const TicketCard = ({
  isGridCard,
  isMediator = false,
  ...props
}: I_TicketCardProps & I_GetChatListSuccessResponse["data"][0]) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <Mobile className="h-full">
        <Card
          href={`/reports/${props.id}`}
          isClickable={!isMediator}
          className="h-full"
        >
          {!!props.has_new && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div
            className={cn(
              "_flexbox__col__start__between h-full w-full",
              "gap-8"
            )}
          >
            <div className="_flexbox__row__center__between w-full">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={props.company?.logo as string}
                  alt={`${props.title} logo`}
                  fill
                  className="object-cover"
                />
              </div>
              <Typography
                variant="p"
                affects="normal"
                className="!text-neutral-light-20 dark:!text-neutral-dark-20"
              >
                {formatDateToAgo(props?.updated_at ?? "")}
              </Typography>
            </div>
            <div className="_flexbox__col__start w-full gap-1">
              <Typography variant="p" affects="large" weight="semibold">
                {props.company?.name}
              </Typography>
              <div className="_flexbox__row__center gap-4">
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-30 dark:!text-neutral-dark-30"
                >
                  #{props.code} - {props.title}
                </Typography>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(
                  props.last_message.length > 50
                    ? props.last_message.substring(0, 50) + "..."
                    : props.last_message
                ),
              }}
            ></div>
            <div
              className={cn(
                "w-full gap-6",
                isGridCard
                  ? "_flexbox__col__start"
                  : "_flexbox__row__center__between"
              )}
            >
              <div
                className={cn("_flexbox__row__center__between w-full gap-8")}
              >
                <div className="_flexbox__col__start gap-2.5">
                  <Indicator
                    variant={
                      props.status && (props.status.toLowerCase() as any)
                    }
                  >
                    {props.status}
                  </Indicator>
                </div>
                <div className="_flexbox__col__start gap-2.5">
                  <Badge
                    variant={
                      props.risk_level_category &&
                      (props.risk_level_category.toLowerCase() as any)
                    }
                  >
                    {`${props.risk_level.toFixed(2)} | ${props.risk_level_category}`}
                  </Badge>
                </div>
              </div>
              {isMediator && (
                <div className={cn("_flexbox__col__start__start w-full gap-3")}>
                  <Button
                    variant="ghost-hacker"
                    prefixIcon={!isGridCard && <Hacker className="h-6 w-6" />}
                    postFixIcon={<ChevronRight />}
                    asLink
                    href={`/reports/${props.id}`}
                    className="!justify-start"
                    fullWidth
                  >
                    Hacker Ticket
                  </Button>
                  {props.related_ticket_id ? (
                    <Button
                      variant="ghost-company"
                      prefixIcon={!isGridCard && <Building2 />}
                      postFixIcon={<ChevronRight />}
                      className="!justify-start"
                      fullWidth
                      asLink
                      href={`/reports/${props.related_ticket_id}`}
                    >
                      Company Ticket
                    </Button>
                  ) : (
                    <Button
                      variant="primary-company"
                      prefixIcon={!isGridCard && <Building2 />}
                      postFixIcon={<ChevronRight />}
                      fullWidth
                      onClick={() => setOpenModal(true)}
                    >
                      Create Company Ticket
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
        <ModalForbidden
          variant="mediator"
          isOpen={openModal}
          onClose={() => setOpenModal(false)}
          title="Create Company Ticket"
          subtitle="Create Company Tickets are currently only accessible on the desktop version of our website."
        />
      </Mobile>
      <Desktop className="h-full">
        <Card
          href={`/reports/${props.id}`}
          isClickable={!isMediator}
          className="h-full"
        >
          {!!props.has_new && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div
            className={cn(
              "_flexbox__col__start w-full",
              isGridCard ? "gap-8" : "gap-12"
            )}
          >
            <div className="_flexbox__row__start__between w-full">
              <div className="grid w-full grid-cols-[auto_1fr] gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={props.company?.logo as string}
                    alt={`${props.title} logo`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="_flexbox__col__start w-full gap-1">
                  <Typography variant="p" affects="large" weight="semibold">
                    #{props.code} - {props.title}
                  </Typography>
                  <div className="_flexbox__row__center gap-4">
                    <Typography
                      variant="p"
                      affects="small"
                      className="!text-neutral-light-30 dark:!text-neutral-dark-30"
                    >
                      {props.company?.name}
                    </Typography>
                  </div>
                </div>
              </div>
              <Typography
                variant="p"
                affects="normal"
                className="!text-neutral-light-20 dark:!text-neutral-dark-20"
              >
                {formatDateToAgo(props?.updated_at ?? "")}
              </Typography>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: sanitize(
                  props.last_message.length > 50
                    ? props.last_message.substring(0, 50) + "..."
                    : props.last_message
                ),
              }}
            ></div>
            <div
              className={cn(
                "w-full gap-6",
                isGridCard
                  ? "_flexbox__col__start"
                  : "_flexbox__row__center__between"
              )}
            >
              <div className={cn("flex w-full flex-wrap items-center gap-8")}>
                <div className="_flexbox__col__start gap-2.5">
                  <Indicator
                    variant={
                      props.status && (props.status.toLowerCase() as any)
                    }
                  >
                    {props.status}
                  </Indicator>
                </div>
                <div className="_flexbox__col__start gap-2.5">
                  <Badge
                    variant={
                      props.risk_level_category &&
                      (props.risk_level_category.toLowerCase() as any)
                    }
                  >
                    {`${props.risk_level.toFixed(2)} | ${props.risk_level_category}`}
                  </Badge>
                </div>
              </div>
              {isMediator && (
                <div
                  className={cn(
                    "w-full max-w-xl gap-3",
                    isGridCard
                      ? "_flexbox__row__center__between"
                      : "_flexbox__row__end__end"
                  )}
                >
                  <Button
                    variant="tertiary-hacker"
                    prefixIcon={!isGridCard && <Hacker className="h-6 w-6" />}
                    postFixIcon={<ChevronRight />}
                    asLink
                    href={`/reports/${props.id}`}
                    fullWidth
                  >
                    Hacker Ticket
                  </Button>
                  {props.related_ticket_id ? (
                    <Button
                      variant="tertiary-company"
                      prefixIcon={!isGridCard && <Building2 />}
                      postFixIcon={<ChevronRight />}
                      fullWidth
                      asLink
                      href={`/reports/${props.related_ticket_id}`}
                    >
                      Company Ticket
                    </Button>
                  ) : (
                    <Button
                      variant="primary-company"
                      prefixIcon={!isGridCard && <Building2 />}
                      postFixIcon={<ChevronRight />}
                      fullWidth
                      asLink
                      href={`/reports/new?ticket_id=${props.id}`}
                    >
                      Create Company Ticket
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </Card>
      </Desktop>
    </>
  );
};

interface I_TicketCardListProps {
  data: I_GetChatListSuccessResponse["data"];
  isGridCard?: boolean;
  isMediator?: boolean;
}

const TicketCardList = ({
  data,
  isGridCard,
  isMediator = false,
}: I_TicketCardListProps) => {
  return data.map((item) => (
    <Suspense fallback={<CardLoader />} key={item.code}>
      <TicketCard isGridCard={isGridCard} isMediator={isMediator} {...item} />
    </Suspense>
  ));
};

export default TicketCardList;
