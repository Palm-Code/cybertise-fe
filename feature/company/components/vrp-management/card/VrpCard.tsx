import {
  Badge,
  badgeVariants,
  Card,
  Indicator,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import { SortFilterType } from "@/types/admin/dashboard";

interface I_VRPCard {
  id?: string;
  name?: string;
  status?: string;
  asset_type?: SortFilterType[];
}

const VRPCard = ({ id, name, status, asset_type }: I_VRPCard) => {
  return (
    <AnimationWrapper>
      <Card isClickable href={`/vrp-launchpad/overview/${id}`}>
        <div className="_flexbox__col__start__start w-full gap-12">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="p" affects="large" weight="semibold">
              {name}
            </Typography>
            <Indicator variant="caution">{status}</Indicator>
          </div>
          <div className="_flexbox__col__start__start gap-2.5">
            <Typography
              variant="p"
              affects="small"
              className="text-neutal-light-20 dark:text-neutral-dark-20"
            >
              Asset type Available
            </Typography>
            <div className="grid grid-flow-col gap-4">
              {asset_type?.map((item) => {
                return (
                  <Badge
                    key={`asset_type-${item?.value}`}
                    variant={item.value as keyof typeof badgeVariants}
                  >
                    {item.label}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </Card>
    </AnimationWrapper>
  );
};

interface I_VRPCardList {
  data?: I_VRPCard[];
}

const VRPCardList = ({ data }: I_VRPCardList) => {
  return data?.map((item) => {
    return <VRPCard key={item?.id} {...item} />;
  });
};

export default VRPCardList;
