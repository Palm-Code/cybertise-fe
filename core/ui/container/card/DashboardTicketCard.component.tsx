import Image from "next/image";
import {
  Badge,
  Card,
  Indicator,
  Separator,
  Tooltip,
  Typography,
} from "../../components";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import {
  formatDateToAgo,
  formatDateToAgo2,
} from "@/utils/formatter/date-formatter";
import { cn } from "@/core/lib/utils";
import { Suspense } from "react";
import { CardLoader, Desktop, Mobile } from "../../layout";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard/get_chat_list";
import { Hacker } from "../../icons";
import { iconColor } from "@/core/constants/common";
import { Building2 } from "lucide-react";

interface I_TicketCardProps {
  isGridCard?: boolean;
  isMediator?: boolean;
}

const TicketCard = ({
  isGridCard,
  isMediator = false,
  ...props
}: I_TicketCardProps & I_GetChatListSuccessResponse["data"][0]) => {
  return (
    <>
      <Mobile>
        <Card href={`/reports/${props.id}`} isClickable className="h-full">
          {(isMediator ? !!props.has_new_mediator : !!props.has_new) && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div className={cn("_flexbox__col__start w-full", "gap-8")}>
            <div className="_flexbox__row__center__between w-full gap-4">
              <Badge variant="default">{props.program?.type}</Badge>
              <Indicator variant={props.status.toLowerCase() as any}>
                {props.status}
              </Indicator>
            </div>
            <div className="_flexbox__col__start__start w-full gap-4">
              <div className="_flexbox__row__center__between w-full">
                <div className="relative aspect-square w-19 overflow-hidden rounded-full">
                  <Image
                    src={props.company?.logo as string}
                    alt={`${props.id} logo`}
                    fill
                    sizes="100%"
                  />
                </div>
                <div className="_flexbox__col__start ml-6 w-full gap-1">
                  {props.title.length > 50 ? (
                    <Tooltip content={props.title}>
                      <Typography variant="p" affects="small">
                        #{props.code} <br />{" "}
                        {props.title.substring(0, 50) + "..."}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography variant="p" affects="small">
                      #{props.code} <br /> {props.title}
                    </Typography>
                  )}
                </div>
                <Typography
                  variant="p"
                  affects="normal"
                  className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                >
                  {formatDateToAgo(props?.updated_at ?? "")}
                </Typography>
              </div>
              <Separator orientation="horizontal" />
              <div className="_flexbox__col__start__start w-full gap-6">
                <div className="_flexbox__col__start gap-2">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Vulnerability type (CWE)
                  </Typography>
                  <Typography variant="p" affects="small" weight="semibold">
                    {props.vulnerabiity_type?.label}
                  </Typography>
                </div>
                <div className="_flexbox__row__center__between w-full">
                  <div className="_flexbox__col__start gap-2">
                    <Typography
                      variant="p"
                      affects="small"
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    >
                      Risk Level
                    </Typography>
                    <Badge
                      variant={props.risk_level_category.toLowerCase() as any}
                    >
                      {`${props.risk_level} | ${props.risk_level_category}`}
                    </Badge>
                  </div>
                  <div className="_flexbox__col__start gap-2">
                    <Typography
                      variant="p"
                      affects="small"
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    >
                      Rewards
                    </Typography>
                    <Typography variant="p" affects="small" weight="semibold">
                      {currencyFormatters.NumberToEUR(props.bounty ?? 0)}
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-20 dark:text-neutral-dark-20"
                >
                  Reported {formatDateToAgo2(props?.created_at ?? "")}
                </Typography>
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop className="h-full">
        <Card href={`/reports/${props.id}`} isClickable className="h-full">
          {(isMediator ? !!props.has_new_mediator : !!props.has_new) && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div className="_flexbox__row__start w-full gap-9">
            {!isGridCard && (
              <div className="relative aspect-square w-12 overflow-hidden rounded-full">
                <Image
                  src={props.company?.logo as string}
                  alt={`${props.id} logo`}
                  fill
                  sizes="100%"
                />
              </div>
            )}
            <div
              className={cn(
                "_flexbox__col__start w-full",
                isGridCard ? "w-full gap-8" : "w-[calc(100%-84px)] gap-12"
              )}
            >
              <div className="_flexbox__row__start__between w-full gap-4">
                {isGridCard && (
                  <div className="relative aspect-square w-12 overflow-hidden rounded-full">
                    <Image
                      src={props.company?.logo as string}
                      alt={`${props.id} logo`}
                      fill
                      sizes="100%"
                    />
                  </div>
                )}
                <div className="_flexbox__col__start w-full gap-1">
                  {props.title.length > 50 ? (
                    <Tooltip content={props.title}>
                      <Typography variant="p" affects="normal">
                        #{props.code} - {props.title.substring(0, 50) + "..."}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography variant="p" affects="normal">
                      #{props.code} - {props.title}
                    </Typography>
                  )}
                  <div className="_flexbox__row__center gap-4">
                    <Badge variant="default">{props.program?.type}</Badge>
                    <Typography
                      variant="p"
                      affects="small"
                      className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                    >
                      Reported {formatDateToAgo2(props?.created_at ?? "")}
                    </Typography>
                  </div>
                </div>
                <div className="_flexbox__row__start__start gap-8">
                  {isMediator && (
                    <Badge variant={"default"}>
                      {props.ticket_type === "Hacker" ? (
                        <Hacker
                          className={cn(iconColor.hacker, "mr-1 h-4 w-4")}
                        />
                      ) : (
                        <Building2
                          className={cn(iconColor.company, "mr-1 h-4 w-4")}
                        />
                      )}
                      {props.ticket_type}
                    </Badge>
                  )}
                  <Typography
                    variant="p"
                    affects="normal"
                    className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                  >
                    {formatDateToAgo(props?.updated_at ?? "")}
                  </Typography>
                </div>
              </div>
              <div
                className={cn(
                  "grid items-start gap-y-8",
                  isGridCard
                    ? "grid-cols-2 gap-x-[60px]"
                    : "grid-flow-col gap-x-28"
                )}
              >
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Vulnerability type (CWE)
                  </Typography>
                  <Typography variant="p" affects="small" weight="semibold">
                    {props.vulnerabiity_type?.label}
                  </Typography>
                </div>
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Risk Level
                  </Typography>
                  <Badge
                    variant={props.risk_level_category.toLowerCase() as any}
                  >
                    {`${props.risk_level && props.risk_level} | ${props.risk_level_category}`}
                  </Badge>
                </div>
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Rewards
                  </Typography>
                  <Typography variant="p" affects="small" weight="semibold">
                    {currencyFormatters.NumberToEUR(props.bounty ?? 0)}
                  </Typography>
                </div>
                {!isGridCard && (
                  <div className="_flexbox__col__start gap-2.5">
                    <Typography
                      variant="p"
                      affects="small"
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    >
                      Status
                    </Typography>
                    <Indicator
                      variant={
                        props.status && (props.status.toLowerCase() as any)
                      }
                    >
                      {props.status}
                    </Indicator>
                  </div>
                )}
              </div>
              {isGridCard && (
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Status
                  </Typography>
                  <Indicator
                    variant={
                      props.status && (props.status.toLowerCase() as any)
                    }
                  >
                    {props.status}
                  </Indicator>
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
  data?: I_GetChatListSuccessResponse["data"];
  isGridCard?: boolean;
  isMediator?: boolean;
}

const TicketCardList = ({
  data,
  isGridCard,
  isMediator = false,
}: I_TicketCardListProps) => {
  if (data)
    return data.map((item) => (
      <Suspense fallback={<CardLoader />} key={item.id}>
        <TicketCard isGridCard={isGridCard} isMediator={isMediator} {...item} />
      </Suspense>
    ));
};

export default TicketCardList;
