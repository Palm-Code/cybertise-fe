import Image from "next/image";
import { Badge, Card, Indicator, Typography } from "../../components";
import { cn } from "@/core/lib/utils";
import Link from "next/link";
import { buttonVariants } from "../../components/button/base-button";
import { VRPCardType } from "@/types/admin/vrp-launchpad";

interface I_TicketCardProps extends VRPCardType {
  isGridCard?: boolean;
}

const TicketCard = ({ isGridCard, ...props }: I_TicketCardProps) => {
  return (
    <Card>
      <div className="_flexbox__row__start w-full gap-9">
        {!isGridCard && (
          <Image
            src={props.logo}
            alt={`${props.company_name} logo`}
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
          <div className="_flexbox__row__center__start w-full">
            {isGridCard && (
              <Image
                src={props.logo}
                alt={`${props.company_name} logo`}
                width={48}
                height={48}
                className="mr-4"
              />
            )}
            <div className="_flexbox__col__start w-full max-w-xl gap-1">
              <Typography variant="p" affects="normal">
                {props.company_name}
              </Typography>
            </div>
            <div className="_flexbox__row__center ml-auto gap-4">
              <Indicator variant="warning">{props.status}</Indicator>
            </div>
          </div>
          <div className="_flexbox__row__center__between w-full">
            <div className="_flexbox__col__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Asset type available
              </Typography>
              <div className={cn("flex flex-wrap items-center gap-4")}>
                {props.asset_type
                  ?.map((item, idx) => (
                    <Badge key={`asset_types-${idx}`} variant={item.value}>
                      {item.label}
                    </Badge>
                  ))
                  .slice(0, 3)}
                {props.asset_type.length > 3 && (
                  <Badge variant="default">
                    +{props.asset_type.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
            {!isGridCard && (
              <Link
                className={cn(buttonVariants({ variant: "primary-mediator" }))}
                href={`/vrp-launchpad/${props.company_name}`}
              >
                See Details
              </Link>
            )}
          </div>
          {isGridCard && (
            <Link
              className={cn(buttonVariants({ variant: "primary-mediator" }))}
              href={`/vrp-launchpad/${props.company_id}`}
            >
              See Details
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

interface I_TicketCardListProps {
  data: VRPCardType[];
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
