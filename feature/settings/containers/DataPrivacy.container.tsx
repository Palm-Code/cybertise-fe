import { Typography } from "@/core/ui/components";
import CardSystemNotification from "../component/_tabs/_contents/notifications/CardSystemNotification";
import CardNews from "../component/_tabs/_contents/notifications/CardNews";
import CardPrivacyPolicy from "../component/_tabs/_contents/data-privacy/CardPrivacyPolicy";
import CardFaq from "../component/_tabs/_contents/data-privacy/CardFaq";
import CardDeactivateAccount from "../component/_tabs/_contents/data-privacy/CardDeactivateAccount";

const DataPrivacy = () => {
  return (
    <>
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          Data & Privacy
        </Typography>
      </div>
      <CardPrivacyPolicy />
      <CardFaq />
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          Security
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-6">
        <Typography variant="h6" weight="bold">
          Account
        </Typography>
        <CardDeactivateAccount />
      </div>
    </>
  );
};
export default DataPrivacy;
