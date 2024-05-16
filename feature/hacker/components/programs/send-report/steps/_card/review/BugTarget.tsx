import { cn } from "@/core/lib/utils";
import { Badge, Card, Typography } from "@/core/ui/components";

interface I_BugTargetProps {
  target_assets: string;
  vulnerability_type: string;
  risk_level: number;
}

const BugTargetCard = ({
  target_assets,
  vulnerability_type,
  risk_level,
}: I_BugTargetProps) => {
  return (
    <Card
      className={cn(
        "rounded-[10px] bg-neutral-light-90 px-4 py-6 xl:px-7.5 xl:py-7.5 dark:bg-neutral-dark-90",
        "_flexbox__col__start__start w-full gap-6"
      )}
    >
      <Typography variant="h6" weight="bold">
        Bug Target
      </Typography>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Target Assets
        </Typography>
        <Typography variant="p" affects="normal">
          {target_assets}
        </Typography>
      </div>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Vulnerability Type
        </Typography>
        <Typography variant="p" affects="normal">
          {vulnerability_type}
        </Typography>
      </div>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Risk Level
        </Typography>
        <Badge
          variant={
            risk_level === 0
              ? "default"
              : risk_level < 4
                ? "low"
                : risk_level >= 4 && risk_level < 7
                  ? "medium"
                  : "high"
          }
        >
          {risk_level} | (
          {risk_level === 0
            ? "No"
            : risk_level < 4
              ? "Low"
              : risk_level >= 4 && risk_level < 7
                ? "Medium"
                : "High"}{" "}
          Risk)
        </Badge>
      </div>
    </Card>
  );
};
export default BugTargetCard;
