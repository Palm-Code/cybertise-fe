import { I_GetChatListItemSuccessResponse } from "@/core/models/common";
import { useGetVulnerabilityType } from "@/core/react-query/client";
import { Avatar, Separator, Typography } from "@/core/ui/components";
import Review from "@/feature/hacker/components/programs/send-report/steps/Review";
import { formatTimestamp } from "@/utils/formatter/date-formatter";

const Summary = ({
  data,
  ticket_type,
}: {
  data: I_GetChatListItemSuccessResponse["data"][0];
  ticket_type: "Hacker" | "Company";
}) => {
  const { data: vulnerabilityType } = useGetVulnerabilityType();
  if (data)
    return (
      <div className="grid max-h-full w-full grid-cols-[auto_1fr] place-items-start content-start gap-3">
        <div className="_flexbox__col__center__start h-full w-fit gap-3">
          <Avatar image={data.sender_avatar} initials="J" />
          <Separator orientation="vertical" className="h-full w-[0.5px]" />
        </div>
        <div className="_flexbox__col__start__start h-full min-h-96 w-full gap-6 pb-12 xl:px-5">
          {ticket_type === "Hacker" ? (
            <Typography variant="p" affects="small" weight="bold">
              {data.sender_name}{" "}
              <span className="font-normal text-violet-normal">
                reported a bug
              </span>{" "}
              to [{data.chat_ticket?.company_name}]
            </Typography>
          ) : (
            <Typography variant="p" affects="small" weight="bold">
              A vulnerability was reported to [{data.chat_ticket?.company_name}]
            </Typography>
          )}
          <Review
            data={data.chat_ticket}
            variant="mediator"
            defaultData={{
              vulnerabilityType: vulnerabilityType,
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
