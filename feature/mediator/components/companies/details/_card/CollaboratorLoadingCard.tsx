import { I_GetCollaboratorSuccessResponse } from "@/core/models/mediator/collaborators";
import { Card, Typography } from "@/core/ui/components";
import { Skeleton } from "@/core/ui/components/skeleton/skeleton";
import { useTranslations } from "next-intl";
import React from "react";

export const CollaboratorLoadingCard = ({ list }: { list: number }) => {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  return Array.from({ length: list }).map(() => (
    <Card>
      <div className="flex w-full flex-col gap-4">
        <Skeleton className="h-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Typography
              variant="p"
              affects="tiny"
              weight="light"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("table.valid_reports")}
            </Typography>
            <Skeleton className="h-4" />
          </div>
          <div className="flex flex-col gap-2">
            <Typography
              variant="p"
              affects="tiny"
              weight="light"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              {t("table.asset_type_reported")}
            </Typography>
            <Skeleton className="h-4" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Typography
            variant="p"
            affects="tiny"
            weight="light"
            className="text-neutral-light-40 dark:text-neutral-dark-40"
          >
            {t("table.last_activity")}
          </Typography>
          <Skeleton className="h-4" />
        </div>
      </div>
    </Card>
  ));
};
