import Image from "next/image";
import { Badge, Button, Card, Indicator, Typography } from "../../components";
import { I_TableReportTicketData } from "@/interfaces";
import { cn } from "@/core/lib/utils";
import { Suspense } from "react";
import { CardLoader, Desktop, Mobile } from "../../layout";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";
import Link from "next/link";
import { Hacker } from "../../icons";
import { Building2, ChevronRight } from "lucide-react";
import { buttonVariants } from "../../components/button/base-button";

interface I_TicketCardProps extends I_TableReportTicketData {
  isGridCard?: boolean;
  isMediator?: boolean;
}

const TicketCard = ({
  isGridCard,
  isMediator = false,
  ...props
}: I_TicketCardProps) => {
  return (
    <>
      <Mobile>
        <Card
          href={`/reports/${props.ticket_number}`}
          isClickable={!isMediator}
        >
          {props.is_new_notification && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div className={cn("_flexbox__col__start w-full", "gap-8")}>
            <div className="_flexbox__row__center__between w-full">
              <Image
                src={props.logo}
                alt={`${props.title} logo`}
                width={48}
                height={48}
                className="mr-4"
              />
              <Typography
                variant="p"
                affects="normal"
                className="!text-neutral-light-20 dark:!text-neutral-dark-20"
              >
                {formatDateToAgo(props.update ?? "")}
              </Typography>
            </div>
            <div className="_flexbox__col__start w-full gap-1">
              <Typography variant="p" affects="large" weight="semibold">
                {props.company_name}
              </Typography>
              <div className="_flexbox__row__center gap-4">
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-30 dark:!text-neutral-dark-30"
                >
                  #{props.ticket_number} - {props.title}
                </Typography>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: sanitize(props.description) }}
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
                    variant={props.status === "Open" ? "warning" : "clear"}
                  >
                    {props.status}
                  </Indicator>
                </div>
                <div className="_flexbox__col__start gap-2.5">
                  <Badge variant={props.risk_level}>{props.risk_level}</Badge>
                </div>
              </div>
              {isMediator && (
                <div
                  className={cn(
                    "w-full gap-3",
                    isGridCard
                      ? "_flexbox__row__center__between"
                      : "_flexbox__row__end__end"
                  )}
                >
                  <Link href={`/reports/${props.ticket_number}`}>
                    <Button
                      variant="secondary-mediator"
                      prefixIcon={!isGridCard && <Hacker className="h-6 w-6" />}
                      postFixIcon={<ChevronRight />}
                    >
                      Hacker Ticket
                    </Button>
                  </Link>
                  <Link href={`/reports/new?=${props.ticket_number}`}>
                    <Button
                      variant="primary-mediator"
                      prefixIcon={!isGridCard && <Building2 />}
                      postFixIcon={<ChevronRight />}
                    >
                      Create Company Ticket
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card
          href={`/reports/${props.ticket_number}`}
          isClickable={!isMediator}
        >
          {props.is_new_notification && (
            <Indicator variant="warning" className="absolute -right-4 -top-4" />
          )}
          <div
            className={cn(
              "_flexbox__col__start w-full",
              isGridCard ? "gap-8" : "gap-12"
            )}
          >
            <div className="_flexbox__row__center__between w-full">
              <Image
                src={props.logo}
                alt={`${props.title} logo`}
                width={48}
                height={48}
                className="mr-4"
              />
              <div className="_flexbox__col__start w-full gap-1">
                <Typography variant="p" affects="large" weight="semibold">
                  #{props.ticket_number} - {props.title}
                </Typography>
                <div className="_flexbox__row__center gap-4">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:!text-neutral-dark-30"
                  >
                    {props.company_name}
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
              dangerouslySetInnerHTML={{ __html: sanitize(props.description) }}
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
                    variant={props.status === "Open" ? "warning" : "clear"}
                  >
                    {props.status}
                  </Indicator>
                </div>
                <div className="_flexbox__col__start gap-2.5">
                  <Badge variant={props.risk_level}>{props.risk_level}</Badge>
                </div>
              </div>
              {isMediator && (
                <div
                  className={cn(
                    "w-full gap-3",
                    isGridCard
                      ? "_flexbox__row__center__between"
                      : "_flexbox__row__end__end"
                  )}
                >
                  <Link href={`/reports/${props.ticket_number}`}>
                    <Button
                      variant="secondary-mediator"
                      prefixIcon={!isGridCard && <Hacker className="h-6 w-6" />}
                      postFixIcon={<ChevronRight />}
                    >
                      Hacker Ticket
                    </Button>
                  </Link>
                  <Link href={`/reports/new?=${props.ticket_number}`}>
                    <Button
                      variant="primary-mediator"
                      prefixIcon={!isGridCard && <Building2 />}
                      postFixIcon={<ChevronRight />}
                    >
                      Create Company Ticket
                    </Button>
                  </Link>
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
  data: I_TableReportTicketData[];
  isGridCard?: boolean;
  isMediator?: boolean;
}

const TicketCardList = ({
  data,
  isGridCard,
  isMediator = false,
}: I_TicketCardListProps) => {
  return data.map((item) => (
    <Suspense fallback={<CardLoader />} key={item.ticket_number}>
      <TicketCard isGridCard={isGridCard} isMediator={isMediator} {...item} />
    </Suspense>
  ));
};

export default TicketCardList;
