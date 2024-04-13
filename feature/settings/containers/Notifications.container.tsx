import { Typography } from "@/core/ui/components";
import CardSystemNotification from "../component/_tabs/_contents/notifications/CardSystemNotification";
import CardNews from "../component/_tabs/_contents/notifications/CardNews";
import { Desktop, Mobile } from "@/core/ui/layout";

interface I_NotifyProps {
  variant: "hacker" | "mediator" | "company";
}

const Notifications = ({ variant }: I_NotifyProps) => {
  return (
    <>
      <Mobile className="space-y-6">
        <div className="_flexbox__row__center__between w-full">
          <Typography variant="h5" weight="bold">
            Notifications
          </Typography>
        </div>
        <CardSystemNotification variant={variant} />
        <CardNews variant={variant} />
      </Mobile>
      <Desktop className="space-y-6">
        <div className="_flexbox__row__center__between w-full">
          <Typography variant="h5" weight="bold">
            Notifications
          </Typography>
        </div>
        <CardSystemNotification variant={variant} />
        <CardNews variant={variant} />
      </Desktop>
    </>
  );
};
export default Notifications;
