import { cn } from "@/core/lib/utils";
import { Card, Switch, Typography } from "@/core/ui/components";
import { Role } from "@/types/admin/sidebar";
import { BellRing } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

interface I_CardSystemNotificationProps {
  variant: keyof typeof Role;
}

const CardSystemNotification = ({ variant }: I_CardSystemNotificationProps) => {
  const t = useTranslations("Settings.notifications");
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
          <BellRing className="mr-4 h-8 w-8" />
          {t("system_notification")}
        </Typography>
        <Switch
          disabled
          variant={variant}
          value={1}
          onChange={() => {
            toast.info("You can't disable system notification", {
              position: "bottom-right",
            });
          }}
        />
      </div>
      <Typography
        variant="p"
        affects="normal"
        className="text-neutral-light-40 dark:text-neutral-dark-40"
      >
        {t("system_notification_description")}
      </Typography>
    </Card>
  );
};
export default CardSystemNotification;
