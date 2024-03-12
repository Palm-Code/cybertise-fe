import { Typography } from "@/core/ui/components";
import CardSystemNotification from "../component/_tabs/_contents/notifications/CardSystemNotification";
import CardNews from "../component/_tabs/_contents/notifications/CardNews";

const Notifications = () => {
  return (
    <>
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          Notifications
        </Typography>
      </div>
      <CardSystemNotification />
      <CardNews />
    </>
  );
};
export default Notifications;
