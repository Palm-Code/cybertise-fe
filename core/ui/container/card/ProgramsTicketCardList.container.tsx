"use client";
import Image from "next/image";
import { Badge, Card, Separator, Tooltip, Typography } from "../../components";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { cn } from "@/core/lib/utils";
import { Desktop, Mobile } from "../../layout";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";

interface I_TicketCardProps {
  isGridCard?: boolean;
}

const TicketCard = ({
  isGridCard,
  ...props
}: I_TicketCardProps & I_GetProgramListSuccessResponse["data"][0]) => {
  return (
    <>
      <Mobile className="h-full">
        <Card isClickable href={`/programs/${props.id}`} className="h-full">
          <div className="_flexbox__row__start w-full gap-9">
            <div className={cn("_flexbox__col__start w-full", "gap-8")}>
              <Badge variant="default">{props.type}</Badge>
              <div className="_flexbox__row__center__between w-full">
                <div className="relative aspect-square w-19 overflow-hidden rounded-full">
                  <Image
                    src={props.company?.logo as string}
                    alt={`${props.id} logo`}
                    fill
                  />
                </div>
                <div className="_flexbox__col__start ml-4 w-full max-w-xl gap-1">
                  <Typography variant="p" affects="normal">
                    {props.company?.name}
                  </Typography>
                </div>
                <Typography
                  variant="p"
                  affects="normal"
                  weight="bold"
                  className="whitespace-nowrap text-nowrap"
                >
                  {currencyFormatters.NumberToEUR(
                    props.company?.lowest_bounty ?? 0
                  )}{" "}
                  -{" "}
                  {currencyFormatters.NumberToEUR(
                    props.company?.highest_bounty ?? 0
                  )}
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
                    {props.asset_types
                      ?.map((item, idx) => (
                        <Badge
                          key={`asset_types-${idx}`}
                          variant={item.label as any}
                        >
                          {item.value}
                        </Badge>
                      ))
                      .slice(0, 3)}
                    {props.asset_types && props.asset_types?.length > 3 && (
                      <Badge variant="default">
                        +{props.asset_types?.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop className="h-full">
        <Card isClickable href={`/programs/${props.id}`} className="h-full">
          <div className="_flexbox__row__start__start w-full gap-9">
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
                "_flexbox__col__start",
                isGridCard ? "w-full gap-8" : "w-[calc(100%-84px)] gap-12"
              )}
            >
              <div className="_flexbox__row__start__between w-full">
                {isGridCard && (
                  <div className="relative mr-4 aspect-square w-19 overflow-hidden rounded-full">
                    <Image
                      src={props.company?.logo as string}
                      alt={`${props.id} logo`}
                      fill
                    />
                  </div>
                )}
                <div className="_flexbox__col__start w-full max-w-xl gap-1">
                  <Typography variant="p" affects="normal">
                    {props.company?.name}
                  </Typography>
                  <div className="_flexbox__row__center gap-4">
                    <Badge variant="default">{props.type}</Badge>
                  </div>
                </div>
                <Typography
                  variant="p"
                  affects="large"
                  weight="bold"
                  className="whitespace-nowrap text-nowrap"
                >
                  {currencyFormatters.NumberToEUR(
                    props.company?.lowest_bounty ?? 0
                  )}{" "}
                  -{" "}
                  {currencyFormatters.NumberToEUR(
                    props.company?.highest_bounty ?? 0
                  )}
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
                    {props.asset_types
                      ?.map((item, idx) => (
                        <Badge
                          key={`asset_types-${idx}`}
                          variant={item.label as any}
                        >
                          {item.value}
                        </Badge>
                      ))
                      .slice(0, 3)}
                    {props.asset_types && props.asset_types.length > 3 && (
                      <Tooltip
                        content={props.asset_types
                          .map((item) => item.value)
                          .slice(3, props.asset_types.length - 1)
                          .join(", ")}
                      >
                        <Badge variant="default">
                          +{props.asset_types.length - 3} more
                        </Badge>
                      </Tooltip>
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
      key={`programs-ticket-${idx}`}
      isGridCard={isGridCard}
      {...item}
    />
  ));
};

export default TicketCardList;
