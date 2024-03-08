import Image from "next/image";
import { Badge, Card, Indicator, Typography } from "../../components";
import { I_TableReportTicketData } from "@/interfaces";
import { cn } from "@/core/lib/utils";
import { Suspense } from "react";
import { CardLoader } from "../../layout";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";

interface I_TicketCardProps extends I_TableReportTicketData {
  isGridCard?: boolean;
}

const TicketCard = ({ isGridCard, ...props }: I_TicketCardProps) => {
  return (
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
          <div className={cn("flex flex-wrap items-center gap-8")}>
            <div className="_flexbox__col__start gap-2.5">
              <Indicator
                variant={props.status === "Open" ? "warning" : "clear"}
                className="-m-2.5"
              >
                {props.status}
              </Indicator>
            </div>
            <div className="_flexbox__col__start gap-2.5">
              <Badge variant={props.risk_level}>{props.risk_level}</Badge>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface I_TicketCardListProps {
  data: I_TableReportTicketData[];
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
