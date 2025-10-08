import { cn } from "@/core/lib/utils";
import { Badge, badgeVariants, Card, Typography } from "@/core/ui/components";
import { riskLevelCalculator } from "@/utils/risk-level-calculator";
import { useTranslations } from "next-intl";

interface I_BugTargetProps {
  target_assets: {
    label?: string;
    value?: string;
    content?: string;
  };
  vulnerability_type: string;
  risk_level: number;
  isNewCompanyTicket?: boolean;
}

const BugTargetCard = ({
  target_assets,
  vulnerability_type,
  risk_level,
  isNewCompanyTicket = false,
}: I_BugTargetProps) => {
  const t = useTranslations("SendReportHacker.reviews");
  return (
    <Card
      className={cn(
        "rounded-[10px] bg-neutral-light-90 px-4 py-6 dark:bg-neutral-dark-90 xl:px-7.5 xl:py-7.5",
        "_flexbox__col__start__start w-full gap-6"
      )}
    >
      {!isNewCompanyTicket && (
        <Typography
          variant="h6"
          weight="bold"
        >
          {t("bug_target.title")}
        </Typography>
      )}
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("bug_target.target_assets")}
        </Typography>
        <div className="flex flex-wrap gap-4">
          <Typography
            variant="p"
            affects="normal"
          >
            {target_assets.content}
          </Typography>
          <Badge
            variant={
              target_assets.value
                ? (target_assets.value.toLowerCase() as keyof typeof badgeVariants)
                : "default"
            }
          >
            {target_assets.label}
          </Badge>
        </div>
      </div>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("bug_target.vulnerability_type")}
        </Typography>
        <Typography
          variant="p"
          affects="normal"
        >
          {vulnerability_type}
        </Typography>
      </div>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("bug_target.risk_level")}
        </Typography>
        <Badge
          variant={
            riskLevelCalculator(risk_level) as keyof typeof badgeVariants
          }
        >
          {risk_level.toFixed(1)} | ({riskLevelCalculator(risk_level)})
        </Badge>
      </div>
    </Card>
  );
};
export default BugTargetCard;
