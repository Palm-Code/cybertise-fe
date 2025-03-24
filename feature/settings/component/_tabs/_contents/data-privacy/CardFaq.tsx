import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { ChevronRight, CircleHelp, FileKey2 } from "lucide-react";
import { useTranslations } from "next-intl";

const CardFaq = () => {
  const t = useTranslations("Settings.data_privacy.faq");
  return (
    <Card
      isClickable
      href={"/faq"}
      target="_blank"
      className={cn(
        "_flexbox__col__start__start w-full gap-3 rounded-xl px-4 py-8 xl:p-7.5",
        "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography
          variant="h6"
          weight="bold"
          className="xl:inline-flex"
        >
          <CircleHelp className="mb-4 mr-4 h-8 w-8 xl:mb-0" />
          {t("title")}
        </Typography>
        <ChevronRight className="hidden xl:block" />
      </div>
      <Typography
        variant="p"
        affects="normal"
        className="text-neutral-light-40 dark:text-neutral-dark-40"
      >
        {t("description")}
      </Typography>
    </Card>
  );
};
export default CardFaq;
