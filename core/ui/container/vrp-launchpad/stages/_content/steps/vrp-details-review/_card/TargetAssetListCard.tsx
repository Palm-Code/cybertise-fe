import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import {
  Badge,
  badgeVariants,
  Card,
  Input,
  Typography,
} from "@/core/ui/components";

const TargetAssetListCard = ({ data }: { data: CreateVrpType }) => {
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
          List of Target Assets
        </Typography>
        {data.target_assets.map((_, index) => (
          <Card
            className={cn(
              "rounded-md bg-neutral-light-100 xl:px-4.5 xl:py-0 dark:bg-neutral-dark-100",
              "_flexbox__row__center__between w-full gap-2"
            )}
            key={`asset-target-${index}`}
          >
            <Input
              transparentBg
              label={`Asset ${index + 1}`}
              value={_.content}
              containerClassName="w-4/6"
              readOnly
            />
            <Badge
              variant={
                data.asset_types_values[
                  index
                ].label.toLowerCase() as keyof typeof badgeVariants
              }
            >
              {data.asset_types_values[index].value}
            </Badge>
          </Card>
        ))}
      </Card>
    </>
  );
};
export default TargetAssetListCard;
