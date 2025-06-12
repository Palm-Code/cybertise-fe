"use client";
import { cn } from "@/core/lib/utils";
import { Pagination, Typography } from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useTranslations } from "next-intl";
import React from "react";
import { StatusTab } from "./tabs/status";
import { useGetChatList } from "../../query/client";
import { useChatListParamStore } from "../../zustand/store/dashboard";
import { PaymentCardView } from "../../containers";
import { useClickPaginate } from "@/core/hooks";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { Role } from "@/types/admin/sidebar";

type I_PaymentProps = {
  variant?: keyof typeof Role;
};

const Payment = ({ variant }: I_PaymentProps) => {
  const store = useChatListParamStore();
  const { payload, setPayload } = store;
  const t = useTranslations("Payment");
  const {
    queryDesktop: { data, isLoading, isFetching, isRefetching },
  } = useGetChatList({
    ...payload,
    params: {
      ...payload.params,
      filter: {
        ...payload.params?.filter,
        ticket_type: "Company",
        status: payload.params?.filter?.status
          ? payload.params?.filter?.status
          : "Waiting for Payment,Paid",
      },
    },
  });

  return (
    <>
      <Mobile>
        <EmptyState
          variant="company"
          type="disallowed"
        />
      </Mobile>
      <Desktop>
        <div className={cn("flex w-full flex-col gap-8 xl:gap-10")}>
          <Typography
            variant="h5"
            weight="bold"
          >
            {t("title")}
          </Typography>
          <StatusTab variant={variant} />
          <PaymentCardView
            isLoading={isLoading || isFetching || isRefetching}
            data={data?.data}
          />
          <Pagination
            variant="company"
            active={payload.params?.page?.size}
            meta={data?.meta}
            activePage={payload.params?.page?.number}
            onClickNext={() =>
              useClickPaginate(payload.params?.page?.number! + 1, store)
            }
            onClickPrevious={() =>
              useClickPaginate(payload.params?.page?.number! - 1, store)
            }
            setActivePage={(v) => useClickPaginate(v, store)}
            onClickShow={(v) => {
              setPayload({
                ...payload,
                params: {
                  ...payload.params,
                  page: {
                    ...payload.params?.page!,
                    size: v,
                  },
                },
              });
            }}
          />
        </div>
      </Desktop>
    </>
  );
};

export default Payment;
