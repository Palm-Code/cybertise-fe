import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import {
  Avatar,
  Badge,
  Indicator,
  Separator,
  Typography,
} from "@/core/ui/components";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import { formatTimestamp } from "@/utils/formatter/date-formatter";
import { riskLevelCalculator } from "@/utils/risk-level-calculator";

const System = ({
  data,
}: {
  data?: I_GetChatListItemSuccessResponse["data"][0];
}) => {
  return (
    <div className="grid h-fit max-h-full w-full grid-cols-[auto_1fr] place-items-start content-start gap-3">
      <div className="_flexbox__col__center__start h-full w-fit gap-3">
        <Avatar image={data?.sender_avatar} initials="S" />
        <Separator
          orientation="vertical"
          className="h-[calc(100%-48px)] w-[0.5px]"
        />
      </div>
      <div className="_flexbox__col__start__start w-full gap-6 pb-12 xl:px-5">
        <div className="_flexbox__row__center__start gap-2">
          <Typography variant="p" affects="small" weight="bold">
            SYSTEM: {data?.content}
          </Typography>
          {data?.badge ? (
            <Badge variant={riskLevelCalculator(data.badge)}>
              {`${data.badge} | ${riskLevelCalculator(data.badge)}`}
            </Badge>
          ) : (
            <Indicator
              variant={
                data?.status_badge?.toLowerCase() as keyof typeof indicatorVariants
              }
            >
              {data?.status_badge}
            </Indicator>
          )}
        </div>
        <Typography
          variant="p"
          affects="tiny"
          weight="medium"
          className="text-neutral-light-50 dark:text-neutral-dark-50"
        >
          {formatTimestamp(data?.updated_at ?? "")}
        </Typography>
      </div>
    </div>
  );
};
export default System;
