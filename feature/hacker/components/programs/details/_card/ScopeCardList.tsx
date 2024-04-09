import { Badge, Card, Typography } from "@/core/ui/components";
import { ProgramDetailScope } from "@/types/admin/programs";

const ScopeCard = ({ asset_name, asset_type, update }: ProgramDetailScope) => {
  return (
    <Card className="_flexbox__col__start__start gap-8">
      <Badge variant="windows">{asset_type}</Badge>
      <div className="_flexbox__col__start__start w-full gap-2">
        <Typography
          variant="p"
          affects="small"
          className="text-neutral-light-30 dark:text-neutral-dark-30"
        >
          Asset Name
        </Typography>
        <Typography variant="p" affects="small" weight="medium">
          {asset_name}
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
          {update}
        </Typography>
      </div>
    </Card>
  );
};

const ScopeCardList = ({ data }: { data: ProgramDetailScope[] }) => {
  return data.map((item, idx) => (
    <ScopeCard key={`scope-card-${idx}`} {...item} />
  ));
};
export default ScopeCardList;
