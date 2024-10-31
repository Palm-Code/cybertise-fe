import React, { PropsWithChildren } from "react";
import { Badge, badgeVariants, Typography } from "..";
import Tooltip from "./tooltip";
import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { useTranslations } from "next-intl";

interface I_TooltipProps extends PropsWithChildren {
  assetTypes: I_GetAssetTypeSuccessResponse["data"];
}

export const AssetTypeTooltip = ({ assetTypes, children }: I_TooltipProps) => {
  const t = useTranslations("Filter");
  return (
    <Tooltip
      contentClassName="p-6 rounded-[10px] bg-background-page-light dark:bg-background-page-dark"
      comps={
        <div className="flex w-full flex-col gap-2">
          <Typography variant="p" affects="normal">
            {t("asset_type")}
          </Typography>
          <div className="flex w-full flex-wrap items-center gap-2">
            {assetTypes.map((item, index) => (
              <Badge
                key={`asset-type-${index}`}
                variant={item.label as keyof typeof badgeVariants}
              >
                {item.value}
              </Badge>
            ))}
          </div>
        </div>
      }
      className="cursor-pointer"
    >
      {children}
    </Tooltip>
  );
};
