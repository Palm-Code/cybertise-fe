import React from "react";
import { cn } from "@/core/lib/utils";
import { Card } from "@/core/ui/components";
import { useChatListParamStore } from "@/feature/company/zustand/store/dashboard";
import { filterItems } from "@/feature/company/constants/dashboard";

const filteredStatus = [
  { label: "All", value: undefined },
  ...filterItems.status.filter((_, index) => [3, 4].includes(index)),
];

export const StatusTab = () => {
  const { payload, setPayload } = useChatListParamStore();
  return (
    <Card
      className={cn(
        "flex items-center justify-between rounded-b-none py-4 xl:justify-start xl:gap-10 xl:py-6"
      )}
    >
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
    </Card>
  );
};
