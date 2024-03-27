import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ShieldCheck } from "@/core/ui/icons";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";

const TargetAssetListCard = () => {
  return (
    <>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6",
          "bg-background-page-light dark:bg-background-page-dark",
          "p-7.5"
        )}
      >
        <Typography variant="h6" weight="bold">
          List of Target Assets
        </Typography>
        {Array(5)
          .fill(0)
          .map((_, index) => (
            <Card
              className="rounded-md bg-neutral-light-100 p-4.5 dark:bg-neutral-dark-100"
              key={`asset-target-${index}`}
            >
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Asset {index + 1}
              </Typography>
              <Typography variant="p" affects="normal">
                Hostname or IP Address Hostname or IP Address
              </Typography>
            </Card>
          ))}
      </Card>
    </>
  );
};
export default TargetAssetListCard;
