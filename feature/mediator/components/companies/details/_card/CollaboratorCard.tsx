import { I_GetCollaboratorSuccessResponse } from "@/core/models/mediator/collaborators";
import { Avatar, Button, Card, Typography } from "@/core/ui/components";
import { formatDateToAgo } from "@/utils/formatter/date-formatter";
import { useTranslations } from "next-intl";
import React from "react";
import { DrawerAssetType } from "../_drawer";
import { cn } from "@/core/lib/utils";

export const CollaboratorCard = ({
  user,
}: I_GetCollaboratorSuccessResponse["data"][0]) => {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  return (
    <Card className="h-full">
      <div className="flex h-full w-full flex-col gap-4">
        <div className={cn("grid grid-cols-[auto_1fr] items-center gap-2")}>
          <Avatar image={user.avatar} className={cn("size-6")} />
          <Typography variant="p" affects="small" weight="medium">
            {user.name}
          </Typography>
        </div>
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

            <Typography variant="p" affects="small" weight="medium">
              {user.valid_report} {t("ticket")}
            </Typography>
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
            {user.asset_types.length > 0 ? (
              <DrawerAssetType name={user.name} assetTypes={user.asset_types} />
            ) : (
              <Typography variant="p" affects="small" weight="medium">
                {user.asset_types.length} {t("asset_type")}
              </Typography>
            )}
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
          <Typography variant="p" affects="small" weight="medium">
            {user.last_active ? formatDateToAgo(user.last_active) : "-"}{" "}
            {t("ago")}
          </Typography>
        </div>
      </div>
    </Card>
  );
};

export const CollaboratorListCard = ({
  data,
}: {
  data: I_GetCollaboratorSuccessResponse["data"];
}) => {
  return data.map((item) => (
    <CollaboratorCard key={item.id} user={item.user} />
  ));
};
