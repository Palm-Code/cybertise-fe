import Image from "next/image";
import {
  Badge,
  Card,
  Indicator,
  Separator,
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

interface I_TicketCardProps {
  isGridCard?: boolean;
}

const TicketCard = ({
  isGridCard,
  ...props
}: I_TicketCardProps & I_GetChatListSuccessResponse["data"][0]) => {
  return (
    <>
      <Mobile>
        <Card href={`/reports/${props.id}`} isClickable className="h-full">
          {!!props.has_new && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div className={cn("_flexbox__col__start w-full", "gap-8")}>
            <div className="_flexbox__row__center__between w-full">
              <Badge variant="default">{props.program?.type}</Badge>
              <Indicator variant="clear">{props.status}</Indicator>
            </div>
            <div className="_flexbox__col__start__start w-full gap-4">
              <div className="_flexbox__row__center__between w-full">
                <div className="relative aspect-square w-19 overflow-hidden rounded-full">
                  <Image
                    src={props.company?.logo as string}
                    alt={`${props.id} logo`}
                    fill
                  />
                </div>
                <div className="_flexbox__col__start ml-6 w-full gap-1">
                  <Typography variant="p" affects="small">
                    #{props.code} <br /> {props.title}
                  </Typography>
                  {/* <div className="_flexbox__row__center gap-4">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                  >
                    {props.date_reported}
                  </Typography>
                </div> */}
                </div>
                <Typography
                  variant="p"
                  affects="normal"
                  className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                >
                  {formatDateToAgo(props.program?.updated_at ?? "")}
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
                    Path Transversal
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
                      {`${props.risk_level.toFixed(2)} | ${props.risk_level_category}`}
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
                  Reported {formatDateToAgo2(props.program?.created_at ?? "")}
                </Typography>
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop className="h-full">
        <Card href={`/reports/${props.id}`} isClickable className="h-full">
          {!!props.has_new && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div className="_flexbox__row__start w-full gap-9">
            {!isGridCard && (
              <div className="relative aspect-square w-12 overflow-hidden rounded-full">
                <Image
                  src={props.company?.logo as string}
                  alt={`${props.id} logo`}
                  fill
                />
              </div>
            )}
            <div
              className={cn(
                "_flexbox__col__start w-full",
                isGridCard ? "w-full gap-8" : "w-[calc(100%-84px)] gap-12"
              )}
            >
              <div className="_flexbox__row__center__between w-full gap-4">
                {isGridCard && (
                  <div className="relative aspect-square w-12 overflow-hidden rounded-full">
                    <Image
                      src={props.company?.logo as string}
                      alt={`${props.id} logo`}
                      fill
                    />
                  </div>
                )}
                <div className="_flexbox__col__start w-full gap-1">
                  <Typography variant="p" affects="normal">
                    #{props.code} - {props.title}
                  </Typography>
                  <div className="_flexbox__row__center gap-4">
                    <Badge variant="default">{props.program?.type}</Badge>
                    <Typography
                      variant="p"
                      affects="small"
                      className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                    >
                      Reported{" "}
                      {formatDateToAgo2(props.program?.created_at ?? "")}
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="p"
                  affects="normal"
                  className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                >
                  {formatDateToAgo(props.program?.updated_at ?? "")}
                </Typography>
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
                    {`${props.risk_level && props.risk_level.toFixed(2)} | ${props.risk_level_category}`}
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
}

const TicketCardList = ({ data, isGridCard }: I_TicketCardListProps) => {
  if (data)
    return data.map((item) => (
      <Suspense fallback={<CardLoader />} key={item.id}>
        <TicketCard isGridCard={isGridCard} {...item} />
      </Suspense>
    ));
};

export default TicketCardList;
