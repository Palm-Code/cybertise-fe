import { Typography } from "@/core/ui/components";
import CardPrivacyPolicy from "../component/_tabs/_contents/data-privacy/CardPrivacyPolicy";
import CardFaq from "../component/_tabs/_contents/data-privacy/CardFaq";
import CardDeactivateAccount from "../component/_tabs/_contents/data-privacy/CardDeactivateAccount";
import { Role } from "@/types/admin/sidebar";
import { useTranslations } from "next-intl";

interface I_DataPrivacyProps {
  variant?: keyof typeof Role;
}

const DataPrivacy = ({ variant }: I_DataPrivacyProps) => {
  const t = useTranslations("Settings.data_privacy");
  return (
    <div className="_flexbox__col__start__start gap-6">
      <div className="_flexbox__row__center__between w-full">
        <Typography
          variant="h5"
          weight="bold"
        >
          {t("title")}
        </Typography>
      </div>
      <CardPrivacyPolicy />
      <CardFaq />
      {variant === "hacker" && (
        <div className="_flexbox__col__start__start w-full gap-6">
          <Typography
            variant="h6"
            weight="bold"
          >
            {t("title_2")}
          </Typography>
          <CardDeactivateAccount variant={variant} />
        </div>
      )}
    </div>
  );
};
export default DataPrivacy;
