import { I_TargetAsset } from "@/core/models/hacker/programs";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { Badge, Card, Typography } from "@/core/ui/components";

const ScopeCard = ({
  asset_type_name,
  asset_type,
  updated_at,
  content,
}: I_TargetAsset) => {
  return (
    <Card className="_flexbox__col__start__start gap-8">
      <Badge variant={asset_type.label as any}>{asset_type.value}</Badge>
      <div className="_flexbox__col__start__start w-full gap-2">
        <Typography
          variant="p"
          affects="small"
          className="text-neutral-light-30 dark:text-neutral-dark-30"
        >
          Asset Name
        </Typography>
        <Typography variant="p" affects="small" weight="medium">
          {content}
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-2">
        <Typography
          variant="p"
          affects="small"
          className="text-neutral-light-30 dark:text-neutral-dark-30"
        >
          Last Update
        </Typography>
        <Typography variant="p" affects="small" weight="medium">
          {updated_at && updated_at.toString().split("T")[0]}
        </Typography>
      </div>
    </Card>
  );
};

const ScopeCardList = ({
  data,
}: {
  data: I_GetProgramDetailsSuccessResponse["data"]["target_assets"];
}) => {
  if (data)
    return data.map((item, idx) => (
      <ScopeCard key={`scope-card-${idx}`} {...item} />
    ));
};
export default ScopeCardList;
