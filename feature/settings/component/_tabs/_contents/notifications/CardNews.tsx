import { cn } from "@/core/lib/utils";
import { I_UpdateProfile } from "@/core/models/company/settings";
import { usePostUpdateProfile } from "@/core/react-query/client";
import { Card, Switch, Typography } from "@/core/ui/components";
import { Role } from "@/types/admin/sidebar";
import { Megaphone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

interface I_CardNewsProps {
  variant: keyof typeof Role;
}

const CardNews = ({ variant }: I_CardNewsProps) => {
  const t = useTranslations("Settings.notifications");
  const { setValue, watch } = useFormContext<I_UpdateProfile>();
  const { mutateAsync } = usePostUpdateProfile(true);
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-3 rounded-xl px-4 py-8 xl:p-7.5",
        "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography
          variant="h6"
          weight="bold"
          className="block space-y-4 xl:inline-flex"
        >
          <Megaphone className="mr-4 h-8 w-8" />
          {t("news")}
        </Typography>
        <Switch
          value={watch("want_news")}
          variant={variant}
          onChange={(v) => {
            setValue("want_news", v, { shouldValidate: true });
            mutateAsync({
              ...watch(),
              want_news: v,
            });
          }}
        />
      </div>
      <Typography
        variant="p"
        affects="normal"
        className="text-neutral-light-40 dark:text-neutral-dark-40"
      >
        {t("news_description")}
      </Typography>
    </Card>
  );
};
export default CardNews;
