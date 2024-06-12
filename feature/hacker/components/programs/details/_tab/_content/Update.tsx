import { I_LatestUpdates } from "@/core/models/hacker/programs";
import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import {
  formatDateToAgo2,
  formatTimestamp,
} from "@/utils/formatter/date-formatter";
import { sanitize } from "@/utils/sanitize-input";

const Update = ({ title, created_at, content }: I_LatestUpdates) => {
  return (
    <AnimationWrapper>
      <Mobile className="px-6">
        <Card className="px-6 py-12">
          <div className="_flexbox__col__start__start w-full gap-6">
            <div className="_flexbox__col__start__start w-full gap-2">
              <Typography variant="p" affects="large" weight="bold">
                {title}
              </Typography>
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-50 dark:text-neutral-dark-50"
              >
                {`${formatTimestamp(created_at ?? "")} (${formatDateToAgo2(created_at ?? "")})`}
              </Typography>
            </div>
            <article
              dangerouslySetInnerHTML={{
                __html: sanitize(content ?? ""),
              }}
            ></article>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card className="px-6 py-12">
          <div className="_flexbox__col__start__start w-full gap-6">
            <div className="_flexbox__col__start__start w-full gap-2">
              <Typography variant="p" affects="extralarge" weight="bold">
                {title}
              </Typography>
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-50 dark:text-neutral-dark-50"
              >
                {`${formatTimestamp(created_at ?? "")} (${formatDateToAgo2(created_at ?? "")})`}
              </Typography>
            </div>
            <article
              dangerouslySetInnerHTML={{
                __html: sanitize(content ?? ""),
              }}
            ></article>
          </div>
        </Card>
      </Desktop>
    </AnimationWrapper>
  );
};

interface I_UpdateList {
  data?: I_LatestUpdates[];
}

const UpdateList = ({ data }: I_UpdateList) => {
  if (!data || data?.length === 0)
    return <EmptyState type="update" variant="hacker" />;

  return (
    <div className="_flexbox__col__start__start mt-4 w-full gap-8">
      {data.map((item, idx) => (
        <Update key={`update-${idx}`} {...item} />
      ))}
    </div>
  );
};

export default UpdateList;
