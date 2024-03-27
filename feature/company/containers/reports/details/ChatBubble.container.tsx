import {
  Avatar,
  Badge,
  Card,
  Separator,
  Typography,
} from "@/core/ui/components";
import Review from "@/feature/hacker/components/programs/send-report/steps/Review";

const ChatBubble = () => {
  return (
    <div className="_flexbox__col__start__start h-fit w-full gap-6 pb-28">
      <div className="grid h-fit max-h-full w-full grid-cols-[auto_1fr] place-items-start content-start gap-3">
        <div className="_flexbox__col__center__start h-full w-fit gap-3">
          <Avatar
            image="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            initials="J"
          />
          <Separator
            orientation="vertical"
            className="h-[calc(100%-48px)] w-[0.5px]"
          />
        </div>
        <div className="_flexbox__col__start__start min-h-96 w-full gap-6 px-5 pb-12">
          <Typography variant="p" affects="small" weight="bold">
            John Doe{" "}
            <span className="font-normal text-lime-normal">reported a bug</span>{" "}
            to [Company Name]
          </Typography>
          <Review />
          <Typography
            variant="p"
            affects="tiny"
            weight="medium"
            className="text-neutral-light-50 dark:text-neutral-dark-50"
          >
            7 March 2024 10:52 AM
          </Typography>
        </div>
      </div>
      <div className="grid h-fit max-h-full w-full grid-cols-[auto_1fr] place-items-start content-start gap-3">
        <div className="_flexbox__col__center__start h-full w-fit gap-3">
          <Avatar image="/system-logo.svg" initials="J" />
          <Separator
            orientation="vertical"
            className="h-[calc(100%-48px)] w-[0.5px]"
          />
        </div>
        <div className="_flexbox__col__start__start w-full gap-6 px-5 pb-12">
          <div className="_flexbox__row__center__start gap-2">
            <Typography variant="p" affects="small" weight="bold">
              SYSTEM: Hacker ticket was created with severity of
            </Typography>
            <Badge variant="medium">Medium</Badge>
          </div>
          <Typography
            variant="p"
            affects="tiny"
            weight="medium"
            className="text-neutral-light-50 dark:text-neutral-dark-50"
          >
            7 March 2024 10:52 AM
          </Typography>
        </div>
      </div>
      <div className="grid h-fit max-h-full w-full grid-cols-[auto_1fr] place-items-start content-start gap-3">
        <div className="_flexbox__col__center__start h-full w-fit gap-3">
          <Avatar
            image="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
            initials="J"
          />
          <Separator
            orientation="vertical"
            className="h-[calc(100%-48px)] w-[0.5px]"
          />
        </div>
        <div className="_flexbox__col__start__start min-h-96 w-full gap-6 px-5 pb-12">
          <Typography variant="p" affects="small" weight="bold">
            John Doe{" "}
            <span className="font-normal text-lime-normal">reported a bug</span>{" "}
            to [Company Name]
          </Typography>
          <Review />
          <Typography
            variant="p"
            affects="tiny"
            weight="medium"
            className="text-neutral-light-50 dark:text-neutral-dark-50"
          >
            7 March 2024 10:52 AM
          </Typography>
        </div>
      </div>
      <div className="grid h-fit max-h-full w-full grid-cols-[auto_1fr] place-items-start content-start gap-3">
        <div className="_flexbox__col__center__start h-full w-fit gap-3">
          <Avatar image="/system-logo.svg" initials="J" />
          <Separator
            orientation="vertical"
            className="h-[calc(100%-48px)] w-[0.5px]"
          />
        </div>
        <div className="_flexbox__col__start__start w-full gap-6 px-5 pb-12">
          <div className="_flexbox__row__center__start gap-2">
            <Typography variant="p" affects="small" weight="bold">
              SYSTEM: Hacker ticket was created with severity of
            </Typography>
            <Badge variant="medium">Medium</Badge>
          </div>
          <Typography
            variant="p"
            affects="tiny"
            weight="medium"
            className="text-neutral-light-50 dark:text-neutral-dark-50"
          >
            7 March 2024 10:52 AM
          </Typography>
        </div>
      </div>
    </div>
  );
};
export default ChatBubble;
