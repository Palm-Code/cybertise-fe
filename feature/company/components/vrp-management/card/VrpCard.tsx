import {
  Badge,
  badgeVariants,
  Card,
  Indicator,
  Separator,
  Typography,
} from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import { SortFilterType } from "@/types/admin/dashboard";

interface I_VRPCard {
  id?: string;
  name?: string;
  status?: string;
  asset_type?: SortFilterType[];
}

const VRPCard = ({ id, name, status, asset_type }: I_VRPCard) => {
  return (
    <>
      <Mobile>
        <Card isClickable href={`/vrp-launchpad/overview/${id}`}>
          <div className="_flexbox__col__start__start w-full gap-4">
            <div className="_flexbox__col__start__between w-full gap-4">
              <Typography variant="p" affects="large" weight="semibold">
                {name}
              </Typography>
              <Indicator variant="caution">{status}</Indicator>
            </div>
            <Separator orientation="horizontal" />
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutal-light-20 dark:text-neutral-dark-20"
              >
                Asset type Available
              </Typography>
              <div className="flex flex-wrap gap-4">
                {asset_type?.slice(0, 3)?.map((item) => {
                  return (
                    <Badge
                      key={`asset_type-${item?.value}`}
                      variant={item.value as keyof typeof badgeVariants}
                    >
                      {item.label}
                    </Badge>
                  );
                })}
                {asset_type && asset_type?.length > 3 && (
                  <Badge variant="default">
                    +{asset_type?.length - 3} More
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Mobile>
      <Desktop>
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
                {asset_type?.slice(0, 3)?.map((item) => {
                  return (
                    <Badge
                      key={`asset_type-${item?.value}`}
                      variant={item.value as keyof typeof badgeVariants}
                    >
                      {item.label}
                    </Badge>
                  );
                })}
                {asset_type && asset_type?.length > 3 && (
                  <Badge variant="default">
                    +{asset_type?.length - 3} More
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </>
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
