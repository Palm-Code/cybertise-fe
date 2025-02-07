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
  const t = useTranslations("DashboardHacker");
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
            title={t("bounties_paid")}
            value={currencyFormatters.NumberToSmallEUR(data.total_bounty ?? 0)}
            changes={data.total_bounty_changes}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard
            title={t("active_tickets")}
            value={data.total_active_tickets.toString() ?? "0"}
            changes={data.total_active_tickets_changes ?? 0}
          />
        </SwiperSlide>
        <SwiperSlide>
          <OverviewCard
            title={t("highest_bounty")}
            value={currencyFormatters.NumberToSmallEUR(
              data.highest_bounty_changes ?? 0
            )}
            changes={data.highest_bounty_changes}
          />
        </SwiperSlide>
      </Swiper>
    );
};
