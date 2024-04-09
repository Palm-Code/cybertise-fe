"use client";
import Image from "next/image";
import { Badge, Card, Separator, Typography } from "../../components";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { cn } from "@/core/lib/utils";
import { ProgramCardType } from "@/types/admin/programs";
import Link from "next/link";
import { buttonVariants } from "../../components/button/base-button";
import { Desktop, Mobile } from "../../layout";

interface I_TicketCardProps extends ProgramCardType {
  isGridCard?: boolean;
}

const TicketCard = ({ isGridCard, ...props }: I_TicketCardProps) => {
  return (
    <>
      <Mobile>
        <Card isClickable href={`/programs/${props.company_name}`}>
          <div className="_flexbox__row__start w-full gap-9">
            <div className={cn("_flexbox__col__start w-full", "gap-8")}>
              <Badge variant="default">{props.domain}</Badge>
              <div className="_flexbox__row__center__between w-full">
                <Image
                  src={props.logo}
                  alt={`${props.company_name} logo`}
                  width={32}
                  height={32}
                  className="rounded-full object-cover"
                />
                <div className="_flexbox__col__start ml-4 w-full max-w-xl gap-1">
                  <Typography variant="p" affects="normal">
                    {props.company_name}
                  </Typography>
                </div>
                <Typography
                  variant="p"
                  affects="large"
                  weight="bold"
                  className="text-nowrap"
                >
                  {currencyFormatters.NumberToEUR(props.min_bounty ?? 0)} -{" "}
                  {currencyFormatters.NumberToEUR(props.max_bounty ?? 0)}
                </Typography>
              </div>
              <Separator orientation="horizontal" />
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
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card isClickable href={`/programs/${props.company_name}`}>
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
              <div className="_flexbox__row__center__between w-full">
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
                  <div className="_flexbox__row__center gap-4">
                    <Badge variant="default">{props.domain}</Badge>
                  </div>
                </div>
                <Typography
                  variant="p"
                  affects="large"
                  weight="bold"
                  className="text-nowrap"
                >
                  {currencyFormatters.NumberToEUR(props.min_bounty ?? 0)} -{" "}
                  {currencyFormatters.NumberToEUR(props.max_bounty ?? 0)}
                </Typography>
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
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </>
  );
};

interface I_TicketCardListProps {
  data: ProgramCardType[];
  isGridCard?: boolean;
}

const TicketCardList = ({ data, isGridCard }: I_TicketCardListProps) => {
  return data.map((item, idx) => (
    <TicketCard
      key={`programs-ticket-${idx}`}
      isGridCard={isGridCard}
      {...item}
    />
  ));
};

export default TicketCardList;
