import React from "react";
import { cn } from "@/core/lib/utils";
import { Button, Card } from "@/core/ui/components";
import { useChatListParamStore } from "@/feature/company/zustand/store/dashboard";
import { filterItems } from "@/feature/company/constants/dashboard";
import { Role } from "@/types/admin/sidebar";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { useGetBillingPortal } from "@/feature/company/query/client";

const filteredStatus = [
  { label: "All", value: undefined },
  ...filterItems.status.filter((_, index) => [3, 4].includes(index)),
];

type I_StatusTabProps = {
  variant?: keyof typeof Role;
};

export const StatusTab = ({ variant }: I_StatusTabProps) => {
  const t = useTranslations();
  const { payload, setPayload } = useChatListParamStore();
  const { mutate: mutateGetBillingPortal } = useGetBillingPortal();

  const handleGetBillingPortal = () => {
    mutateGetBillingPortal();
  };

  return (
    <Card
      className={cn(
        "flex w-full items-center !justify-between rounded-b-none",
        "py-4 xl:justify-start xl:gap-10 xl:py-6"
      )}
    >
      <div className="flex items-center gap-6 xl:gap-10">
        {filteredStatus.map((item, index) => (
          <button
            key={`tab-${index}`}
            type="button"
            className={cn(
              "border-b-4 hover:border-b-sky-normal",
              payload.params?.filter?.status === item.value
                ? "border-b-sky-normal"
                : "border-b-transparent"
            )}
            onClick={() =>
              setPayload({
                ...payload,
                params: {
                  ...payload.params,
                  filter: {
                    ...payload.params?.filter,
                    status: item.value as string,
                  },
                },
              })
            }
          >
            {item.label}
          </button>
        ))}
      </div>
      {variant === "company" && (
        <Button
          variant="tertiary-company"
          postFixIcon={<ChevronRight />}
          onClick={handleGetBillingPortal}
        >
          {t("Ticket.payment_dashboard")}
        </Button>
      )}
    </Card>
  );
};
