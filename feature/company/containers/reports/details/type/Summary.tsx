import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import {
  useGetAssetType,
  useGetTargetAsset,
  useGetVulnerabilityType,
} from "@/core/react-query/client";
import { Avatar, Separator, Typography } from "@/core/ui/components";
import Review from "@/feature/hacker/components/programs/send-report/steps/Review";
import { formatTimestamp } from "@/utils/formatter/date-formatter";

const Summary = ({
  data,
}: {
  data: I_GetChatListItemSuccessResponse["data"][0];
}) => {
  const { data: assetType } = useGetAssetType();
  const { data: targetAsset } = useGetTargetAsset({
    params: {
      filter: {
        id: data.chat_ticket?.target_asset_id,
      },
    },
  });
  const { data: vulnerabilityType } = useGetVulnerabilityType();

  return (
    <div className="grid h-fit max-h-full w-full grid-cols-[auto_1fr] place-items-start content-start gap-3">
      <div className="_flexbox__col__center__start h-full w-fit gap-3">
        <Avatar image={data.sender_avatar} initials="J" />
        <Separator
          orientation="vertical"
          className="h-[calc(100%-48px)] w-[0.5px]"
        />
      </div>
      <div className="_flexbox__col__start__start min-h-96 w-full gap-6 pb-12 xl:px-5">
        <Typography variant="p" affects="small" weight="bold">
          A vulnerability was reported to [{data.chat_ticket?.company_name}]
        </Typography>
        <Review
          data={data.chat_ticket}
          defaultData={{
            assetType: assetType ?? [],
            targetAssets: targetAsset?.data ?? [],
            vulnerabilityType: vulnerabilityType ?? [],
          }}
        />
        <Typography
          variant="p"
          affects="tiny"
          weight="medium"
          className="text-neutral-light-50 dark:text-neutral-dark-50"
        >
          {formatTimestamp(data?.updated_at ?? "")}
        </Typography>
      </div>
    </div>
  );
};
export default Summary;
