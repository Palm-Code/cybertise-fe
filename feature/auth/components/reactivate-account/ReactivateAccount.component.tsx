"use client";
import { cn } from "@/core/lib/utils";
import { Button } from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import { Locker } from "@/core/ui/icons";
import { Desktop, Mobile } from "@/core/ui/layout";
import { format, parseISO } from "date-fns";
import { useRouter } from "next/navigation";
import React from "react";
import { usePostReactivateAccount } from "../../query/reactivate-account";
import { useTranslations } from "next-intl";

interface I_ReactivateAccountProps
  extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  data: {
    message: string;
    deactivated_at: Date;
    destroyed_at: Date;
    session_code: string;
  };
  onClickCancel?: () => void;
}

export const ReactivateAccount = ({
  noPadding = false,
  data,
  onClickCancel = () => {},
  ...props
}: I_ReactivateAccountProps) => {
  const t = useTranslations("Reactivate");
  const { mutate, isPending, isSuccess } = usePostReactivateAccount();
  const onClickReactivate = () => {
    mutate(data.session_code);
  };

  return (
    <>
      <Mobile>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg ",
            "_flexbox__col__center gap-28",
            noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__col__center w-full gap-6">
            <Locker className="h-12 w-12" />
            <Typography
              variant="h4"
              weight="semibold"
            >
              {t("title")}
            </Typography>
            <Typography
              variant="p"
              affects="small"
              align="center"
              className="text-neutral-light-50 dark:text-neutral-dark-50"
            >
              {t("description")}{" "}
              {format(parseISO(data.deactivated_at.toString()), "MMMM dd yyyy")}
              .
            </Typography>
            <div className="_flexbox__col__start__start mt-6 gap-4">
              <Typography
                variant="h5"
                weight="semibold"
                align="left"
                className="mr-auto"
              >
                {t("content_title")}
              </Typography>
              <ul className="flex list-inside list-disc flex-col gap-4 text-start text-neutral-light-50 dark:text-neutral-dark-50">
                <li>
                  {t("content_lists_1", {
                    date: format(
                      parseISO(data.destroyed_at.toString()),
                      "MMMM dd yyyy"
                    ),
                  })}
                </li>
                <li>{t("content_lists_2")}</li>
              </ul>
            </div>
            <div className="_flexbox__col__center mt-6 w-full gap-6">
              <Button
                disabled={isPending || isSuccess}
                isLoading={isPending}
                variant="primary-hacker"
                onClick={onClickReactivate}
                fullWidth
              >
                {t("submit_button")}
              </Button>
              <Button
                variant="ghost-default"
                onClick={() => window.location.replace("/")}
              >
                {t("cancel_button")}
              </Button>
            </div>
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg bg-background-main-light dark:bg-background-main-dark",
            "_flexbox__col__center gap-28",
            noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__col__center w-full gap-6">
            <Locker />
            <Typography
              variant="h4"
              weight="bold"
            >
              {t("title")}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              align="center"
              className="text-neutral-light-50 dark:text-neutral-dark-50"
            >
              {t("description")}{" "}
              {format(parseISO(data.deactivated_at.toString()), "MMMM dd yyyy")}
              .
            </Typography>
            <div className="_flexbox__col__start__start mt-6 gap-4">
              <Typography
                variant="h5"
                weight="semibold"
                align="left"
                className="mr-auto"
              >
                {t("content_title")}
              </Typography>
              <ul className="flex list-inside list-disc flex-col gap-4 text-start text-neutral-light-50 dark:text-neutral-dark-50">
                <li>
                  {t("content_lists_1", {
                    date: format(
                      parseISO(data.destroyed_at.toString()),
                      "MMMM dd yyyy"
                    ),
                  })}
                </li>
                <li>{t("content_lists_2")}</li>
              </ul>
            </div>
            <div className="_flexbox__col__center mt-6 w-full gap-6">
              <Button
                disabled={isPending || isSuccess}
                isLoading={isPending}
                variant="primary-hacker"
                onClick={onClickReactivate}
                fullWidth
              >
                {t("submit_button")}
              </Button>
              <Button
                variant="ghost-default"
                onClick={() => window.location.replace("/")}
              >
                {t("cancel_button")}
              </Button>
            </div>
          </div>
        </div>
      </Desktop>
    </>
  );
};
