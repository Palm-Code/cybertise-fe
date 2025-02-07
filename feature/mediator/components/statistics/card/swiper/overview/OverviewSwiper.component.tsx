import { I_GetAnalyticsSuccessResponse } from "@/core/models/common/analytics";
import { useTranslations } from "next-intl";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { OverviewCard } from "../../OverviewCard";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";
import { cn } from "@/core/lib/utils";

type OverviewSwiperProps = {
  data?: I_GetAnalyticsSuccessResponse["data"];
};
export const OverviewSwiper = ({ data }: OverviewSwiperProps) => {
  const t = useTranslations("DashboardMediator");
  if (data)
    return (
      <Swiper
        slidesPerView={1.7}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 3,
          },
        }}
        className={cn("!grid w-full grid-cols-1")}
      >
        <SwiperSlide className={cn("*:!h-full")}>
          <OverviewCard
            title={t("published_vrp")}
            value={data.published_vrp.toString() ?? "0"}
            changes={data.published_vrp_changes ?? 0}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard
            title={t("unpublished_vrp")}
            value={data.unpublished_vrp.toString() ?? "0"}
            changes={data.unpublished_vrp_changes ?? 0}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard
            title={t("active_tickets")}
            value={currencyFormatters.NumberToSmallEUR(
              data.highest_bounty_changes ?? 0
            )}
            changes={data.highest_bounty_changes}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard
            title={t("valid_tickets")}
            value={currencyFormatters.NumberToSmallEUR(
              data.highest_bounty_changes ?? 0
            )}
            changes={data.highest_bounty_changes}
          />
        </SwiperSlide>
      </Swiper>
    );
};
