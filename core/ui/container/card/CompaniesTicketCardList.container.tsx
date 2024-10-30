import Image from "next/image";
import {
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
import { Desktop, Mobile } from "../../layout";
import { I_GetCompaniesSuccessResponse } from "@/core/models/mediator/companies/get_companies";
import { indicatorVariants } from "../../components/indicator/indicator";
import { useTranslations } from "next-intl";

interface I_TicketCardProps {
  isGridCard?: boolean;
}

const TicketCard = ({
  isGridCard,
  ...props
}: I_TicketCardProps & I_GetCompaniesSuccessResponse["data"][0]) => {
  const t = useTranslations("Programs");
  return (
    <>
      <Mobile>
        <Card isClickable href={`/companies/${props.id}`}>
          <div className="_flexbox__row__start w-full gap-9">
            <div className={cn("_flexbox__col__start__start w-full gap-8")}>
              <div className="_flexbox__col__start w-full max-w-xl gap-4">
                <div className="_flexbox__row__center__start w-full gap-4">
                  <Avatar image={props.logo} className="h-8 w-8" initials="C" />
                  <Typography variant="p" affects="normal">
                    {props.name}
                  </Typography>
                </div>
                <div className="_flexbox__row__center gap-4">
                  <Indicator
                    variant={
                      props.status.toLowerCase() as keyof typeof indicatorVariants
                    }
                  >
                    {props.status}
                  </Indicator>
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
                    {props.asset_types &&
                      props.asset_types
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
                      <Tooltip
                        content={props.asset_types
                          .map((item) => item.value)
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
      </Mobile>
      <Desktop className="h-full min-h-[210px]">
        <Card isClickable href={`/companies/${props.id}`} className="h-full">
          <div className="_flexbox__row__start h-full w-full gap-9">
            {!isGridCard && (
              <Avatar image={props.logo} className="h-12 w-12" initials="C" />
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
                    image={props.logo}
                    className="h-12 w-12"
                    initials="C"
                  />
                )}
                <div className="_flexbox__col__start w-full max-w-xl gap-1">
                  <Typography variant="p" affects="normal">
                    {props.name}
                  </Typography>
                </div>
                <div className="_flexbox__row__center mb-auto ml-auto gap-4">
                  <Indicator
                    variant={
                      props.status.toLowerCase() as keyof typeof indicatorVariants
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
                    {props.asset_types &&
                      props.asset_types
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
                      <Tooltip
                        content={props.asset_types
                          .map((item) => item.value)
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
  data: I_GetCompaniesSuccessResponse["data"];
  isGridCard?: boolean;
}

const TicketCardList = ({ data, isGridCard }: I_TicketCardListProps) => {
  return data.map((item, idx) => (
    <TicketCard
      key={`companies-ticket-${idx}`}
      isGridCard={isGridCard}
      {...item}
    />
  ));
};

export default TicketCardList;
