import { Badge, Card, Indicator, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import { VRPCompaniesCardType } from "@/types/admin/vrp-launchpad";

const VRPCard = ({ id, title, asset_type, status }: VRPCompaniesCardType) => {
  return (
    <AnimationWrapper>
      <Card isClickable href={`/vrp-launchpad/${id}`}>
        <div className="_flexbox__col__start__start w-full gap-12">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="p" affects="large" weight="semibold">
              {title}
            </Typography>
            <Indicator variant="caution">{status}</Indicator>
          </div>
          <div className="_flexbox__row__center__between w-full">
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography variant="p" affects="small">
                Assets type available
              </Typography>
              <div className="grid grid-flow-col gap-4">
                {asset_type.map((item, index) => (
                  <Badge key={index} variant={item.value}>
                    {item.label}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </AnimationWrapper>
  );
};

const VrpCardList = ({ data }: { data: VRPCompaniesCardType[] }) => {
  return data.map((item, index) => <VRPCard key={index} {...item} />);
};

export default VrpCardList;
