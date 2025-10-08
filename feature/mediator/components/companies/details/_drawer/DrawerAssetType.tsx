import { I_GetAssetTypeSuccessResponse } from "@/core/models/common";
import { Badge, badgeVariants, Button, Typography } from "@/core/ui/components";
import {
  BaseDrawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/core/ui/components/drawer/base-drawer";
import { useTranslations } from "next-intl";
import React from "react";

interface I_DrawerAssetTypeProps {
  assetTypes: I_GetAssetTypeSuccessResponse["data"];
  name: string;
}

export const DrawerAssetType = ({
  assetTypes,
  name,
}: I_DrawerAssetTypeProps) => {
  const t = useTranslations("CompanyDetailsMediator.collaborators");
  return (
    <BaseDrawer>
      <DrawerTrigger>
        <Button
          variant="ghost-mediator"
          size="ghost"
          className="justify-start underline underline-offset-8"
          fullWidth
        >
          <Typography
            variant="p"
            affects="small"
            weight="medium"
          >
            {assetTypes.length} {t("asset_type")}
          </Typography>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90%] bg-background-page-light dark:bg-background-page-dark">
        <DrawerHeader className="flex flex-col items-start justify-start gap-4">
          <DrawerTitle>
            {name} - {t("table.asset_type_reported")}
          </DrawerTitle>
          <div className="flex flex-wrap gap-x-2 gap-y-4">
            {assetTypes.map((item, index) => (
              <Badge
                key={`asset-type-${index}`}
                variant={item.label as keyof typeof badgeVariants}
              >
                {item.value}
              </Badge>
            ))}
          </div>
        </DrawerHeader>
      </DrawerContent>
    </BaseDrawer>
  );
};
