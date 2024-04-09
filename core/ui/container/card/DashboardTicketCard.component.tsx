import Image from "next/image";
import {
  Badge,
  Card,
  Indicator,
  Separator,
  Typography,
} from "../../components";
import { I_TableTicketData } from "@/interfaces";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { cn } from "@/core/lib/utils";
import { Suspense } from "react";
import { CardLoader, Desktop, Mobile } from "../../layout";

interface I_TicketCardProps extends I_TableTicketData {
  isGridCard?: boolean;
}

const TicketCard = ({ isGridCard, ...props }: I_TicketCardProps) => {
  return (
    <>
      <Mobile>
        <Card href={`/reports/${props.ticket_number}`} isClickable>
          {props.is_new_notification && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div className={cn("_flexbox__col__start w-full", "gap-8")}>
            <div className="_flexbox__row__center__between w-full">
              <Badge variant="default">{props.domain}</Badge>
              <Indicator variant="clear">Status</Indicator>
            </div>
            <div className="_flexbox__col__start__start w-full gap-4">
              <div className="_flexbox__row__center__between w-full">
                <Image
                  src={props.logo}
                  alt={`${props.title} logo`}
                  width={48}
                  height={48}
                />
                <div className="_flexbox__col__start ml-6 w-full gap-1">
                  <Typography variant="p" affects="small">
                    #{props.ticket_number} <br /> {props.title}
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
                  {formatDateToAgo(props.update ?? "")}
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
                    <Badge variant={props.risk_level}>{props.risk_level}</Badge>
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
                      {currencyFormatters.NumberToEUR(props.rewards ?? 0)}
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-20 dark:text-neutral-dark-20"
                >
                  Reported {props.date_reported}
                </Typography>
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card href={`/reports/${props.ticket_number}`} isClickable>
          {props.is_new_notification && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div className="_flexbox__row__start w-full gap-9">
            {!isGridCard && (
              <Image
                src={props.logo}
                alt={`${props.title} logo`}
                width={48}
                height={48}
              />
            )}
            <div
              className={cn(
                "_flexbox__col__start w-full",
                isGridCard ? "gap-8" : "gap-12"
              )}
            >
              <div className="_flexbox__row__center__between w-full">
                {isGridCard && (
                  <Image
                    src={props.logo}
                    alt={`${props.title} logo`}
                    width={48}
                    height={48}
                    className="mr-4"
                  />
                )}
                <div className="_flexbox__col__start w-full gap-1">
                  <Typography variant="p" affects="normal">
                    #{props.ticket_number} - {props.title}
                  </Typography>
                  <div className="_flexbox__row__center gap-4">
                    <Badge variant="default">{props.domain}</Badge>
                    <Typography
                      variant="p"
                      affects="small"
                      className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                    >
                      {props.date_reported}
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="p"
                  affects="normal"
                  className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                >
                  {formatDateToAgo(props.update ?? "")}
                </Typography>
              </div>
              <div
                className={cn(
                  "flex flex-wrap items-center gap-y-8",
                  isGridCard ? "gap-x-[60px]" : "gap-x-28"
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
                    Path Transversal
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
                  <Badge variant={props.risk_level}>{props.risk_level}</Badge>
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
                    {currencyFormatters.NumberToEUR(props.rewards ?? 0)}
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
                      variant={props.status === "Open" ? "warning" : "clear"}
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
                    variant={props.status === "Open" ? "warning" : "clear"}
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
  data: I_TableTicketData[];
  isGridCard?: boolean;
}

const TicketCardList = ({ data, isGridCard }: I_TicketCardListProps) => {
  return data.map((item) => (
    <Suspense fallback={<CardLoader />} key={item.ticket_number}>
      <TicketCard isGridCard={isGridCard} {...item} />
    </Suspense>
  ));
};

export default TicketCardList;
