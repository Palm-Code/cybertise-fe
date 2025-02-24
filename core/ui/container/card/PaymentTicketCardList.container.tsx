import Image from "next/image";
import {
  Badge,
  Button,
  Card,
  Indicator,
  Separator,
  Tooltip,
  Typography,
} from "../../components";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { cn } from "@/core/lib/utils";
import { Suspense } from "react";
import { CardLoader, Desktop, Mobile } from "../../layout";
import { I_GetChatListSuccessResponse } from "@/core/models/hacker/dashboard/get_chat_list";
import { Hacker } from "../../icons";
import { iconColor } from "@/core/constants/common";
import { Building2, ChevronRight, Ellipsis } from "lucide-react";
import { useTranslations } from "next-intl";
import { indicatorVariants } from "../../components/indicator/indicator";
import { usePostUpdateTicket } from "@/feature/mediator/query/client";

interface I_TicketCardProps {
  isMediator?: boolean;
}

const TicketCard = ({
  isMediator = false,
  ...props
}: I_TicketCardProps & I_GetChatListSuccessResponse["data"][0]) => {
  const t = useTranslations("Ticket");
  const { mutateAsync: mutateUpdateTicket, isPending: isPendingUpdate } =
    usePostUpdateTicket(props.related_ticket_id ?? props.id);

  const onClickSendRequest = () => {
    mutateUpdateTicket(`status=Waiting for Payment`);
  };

  return (
    <>
      <Mobile>
        <Card
          href={`/reports/${props.id}`}
          isClickable
          className="h-full"
        >
          {(isMediator ? !!props.has_new_mediator : !!props.has_new) && (
            <Indicator
              variant="warning"
              className="absolute -right-4 -top-4"
            />
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
                      <Typography
                        variant="p"
                        affects="small"
                      >
                        #{props.code} <br />{" "}
                        {props.title.substring(0, 50) + "..."}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography
                      variant="p"
                      affects="small"
                    >
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
                    {t("vulnerability_type")}
                  </Typography>
                  <Typography
                    variant="p"
                    affects="small"
                    weight="semibold"
                  >
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
                      {t("risk_level")}
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
                      {t("rewards")}
                    </Typography>
                    <Typography
                      variant="p"
                      affects="small"
                      weight="semibold"
                    >
                      {currencyFormatters.NumberToEUR(props.bounty ?? 0)}
                    </Typography>
                  </div>
                </div>
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-20 dark:text-neutral-dark-20"
                >
                  {t("last_reported", {
                    date: formatDateToAgo(props?.created_at ?? ""),
                  })}
                </Typography>
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop className="h-full">
        <Card className="h-full">
          {(isMediator ? !!props.has_new_mediator : !!props.has_new) && (
            <Indicator
              variant="warning"
              className="absolute -right-4 -top-4"
            />
          )}
          <div className="_flexbox__row__start w-full gap-9">
            <div className={cn("_flexbox__col__start w-full", "gap-12")}>
              <div className="_flexbox__row__start__start w-full gap-4">
                <div className={cn("_flexbox__col__start gap-1")}>
                  {props.title.length > 50 ? (
                    <Tooltip content={props.title}>
                      <Typography
                        variant="p"
                        affects="normal"
                      >
                        #{props.code} - {props.title.substring(0, 50) + "..."}
                      </Typography>
                    </Tooltip>
                  ) : (
                    <Typography
                      variant="p"
                      affects="normal"
                    >
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
                      {t("last_reported", {
                        date: formatDateToAgo(props?.created_at ?? ""),
                      })}
                    </Typography>
                  </div>
                </div>
                <div className="_flexbox__row__start__start ml-auto gap-2">
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
                  "grid-flow-col gap-x-28"
                )}
              >
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    {t("vulnerability_type")}
                  </Typography>
                  <Typography
                    variant="p"
                    affects="small"
                    weight="semibold"
                  >
                    {props.vulnerabiity_type?.label}
                  </Typography>
                </div>
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    {t("risk_level")}
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
                    {t("status")}
                  </Typography>
                  <Indicator
                    variant={
                      props.status?.toLowerCase() as keyof typeof indicatorVariants
                    }
                  >
                    {props.status}
                  </Indicator>
                </div>
                <Separator orientation="vertical" />
                <div className="_flexbox__col__start gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    {t("rewards")}
                  </Typography>
                  <Typography
                    variant="p"
                    affects="small"
                    weight="semibold"
                  >
                    {currencyFormatters.NumberToEUR(props.bounty ?? 0)}
                  </Typography>
                </div>
              </div>
              {isMediator ? (
                <div
                  className={cn("flex w-full items-center justify-end gap-3")}
                >
                  <Button
                    variant="tertiary-hacker"
                    prefixIcon={<Hacker className="h-6 w-6" />}
                    postFixIcon={<ChevronRight />}
                    asLink
                    href={`/reports/${props.id}`}
                  >
                    {t("hacker_ticket")}
                  </Button>
                  <Button
                    variant="tertiary-company"
                    prefixIcon={<Building2 />}
                    postFixIcon={<ChevronRight />}
                    asLink
                    href={`/reports/${props.related_ticket_id}`}
                  >
                    {t("company_ticket")}
                  </Button>
                  <Button
                    disabled={props.is_requested_payment || isPendingUpdate}
                    isLoading={isPendingUpdate}
                    variant="primary-mediator"
                    onClick={onClickSendRequest}
                  >
                    {props.is_requested_payment
                      ? t("payment_request_sent")
                      : t("send_payment_request")}
                  </Button>
                  <Button
                    size="icon"
                    variant="tertiary-mediator"
                  >
                    <Ellipsis />
                  </Button>
                </div>
              ) : (
                <div
                  className={cn("flex w-full items-center justify-end gap-8")}
                >
                  <Button
                    asLink
                    href={`/reports/${props.id}`}
                    variant="secondary-company"
                  >
                    {t("view_chat")}
                  </Button>
                  <Button variant="primary-company">{t("make_payment")}</Button>
                  <Button
                    size="icon"
                    variant="tertiary-company"
                  >
                    <Ellipsis />
                  </Button>
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
  isMediator?: boolean;
}

const TicketCardList = ({
  data,
  isMediator = false,
}: I_TicketCardListProps) => {
  if (data)
    return data.map((item) => (
      <Suspense
        fallback={<CardLoader />}
        key={item.id}
      >
        <TicketCard
          isMediator={isMediator}
          {...item}
        />
      </Suspense>
    ));
};

export default TicketCardList;
