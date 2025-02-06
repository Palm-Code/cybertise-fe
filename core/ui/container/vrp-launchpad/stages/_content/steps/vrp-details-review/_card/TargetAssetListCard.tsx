import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import {
  Badge,
  badgeVariants,
  Card,
  Input,
  Typography,
} from "@/core/ui/components";
import { useTranslations } from "next-intl";

const TargetAssetListCard = ({ data }: { data: CreateVrpType }) => {
  const t = useTranslations("VRPLaunchpad.phase.vrp_details.target_assets");
  return (
    <>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-background-page-light dark:bg-background-page-dark",
          "xl:p-7.5"
        )}
      >
        <Typography variant="h6" weight="bold">
          {t("header_title")}
        </Typography>
        {data.target_assets.map((item, index) => (
          <Card
            className={cn(
              "rounded-md bg-neutral-light-100 dark:bg-neutral-dark-100 xl:px-4.5 xl:py-0",
              "_flexbox__row__center__between w-full gap-2"
            )}
            key={`asset-target-${index}`}
          >
            <Input
              transparentBg
              label={`${t(`asset`)} ${index + 1}`}
              value={item.content}
              containerClassName="w-4/6"
              readOnly
            />
            <Badge
              variant={
                item.asset_type
                  ? (item.asset_type.label.toLowerCase() as keyof typeof badgeVariants)
                  : "default"
              }
            >
              {item.asset_type?.value}
            </Badge>
          </Card>
        ))}
      </Card>
    </>
  );
};
export default TargetAssetListCard;
