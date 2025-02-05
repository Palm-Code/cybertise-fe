"use client";
import { cn } from "@/core/lib/utils";
import { Loader } from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import { Locker } from "@/core/ui/icons";
import { Desktop, Mobile } from "@/core/ui/layout";
import useTimer from "@/utils/timer";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useReadLocalStorage } from "usehooks-ts";

interface I_SuccesStateProps extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
  onClickResendVerification?: () => void;
}

const SuccessState = ({
  noPadding = false,
  onClickResendVerification = () => {},
  ...props
}: I_SuccesStateProps) => {
  const expiredTime = useReadLocalStorage("expiredTime") as string;
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("AuthenticateEmail");
  const { remainingTime, start, getFormattedTime } = useTimer(expiredTime);
  const searchparams = useSearchParams();
  const email = searchparams.get("authenticate_email");

  useEffect(() => {
    start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const onClickResend = () => {
    onClickResendVerification();
    start();
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
            <Typography variant="h4" weight="semibold" align="center">
              {t("title")}
            </Typography>
            <Typography
              variant="p"
              affects="small"
              align="center"
              className="auto__phrase"
            >
              {t("description_1")}
            </Typography>
            <Typography variant="p" affects="small" weight="semibold">
              {email}
            </Typography>
          </div>
          <Typography
            variant="p"
            affects="small"
            align="center"
            className="auto__phrase"
          >
            {t("description_2")}{" "}
            <button
              type="button"
              title="resend"
              disabled={remainingTime > 0}
              className="cursor-pointer font-bold text-brand-emerald underline disabled:text-opacity-50"
              onClick={onClickResend}
            >
              {t("resend_button")}{" "}
              {remainingTime > 0 ? `(${getFormattedTime()})` : ""}
            </button>
          </Typography>
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
            <Typography variant="h4" weight="bold" align="center">
              {t("title")}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              align="center"
              className="auto__phrase"
            >
              {t("description_1")}
            </Typography>
            <Typography variant="p" affects="normal" weight="semibold">
              {email}
            </Typography>
          </div>
          <div className={cn("flex flex-col items-center")}>
            <Typography
              variant="p"
              affects="normal"
              align="center"
              className="auto__phrase"
            >
              {t("description_2")}{" "}
            </Typography>
            <button
              type="button"
              title="resend"
              disabled={remainingTime > 0 || isLoading}
              className="cursor-pointer font-bold text-brand-emerald underline disabled:cursor-not-allowed disabled:text-opacity-50"
              onClick={onClickResend}
            >
              {isLoading ? (
                <Loader width={16} height={16} noText className={cn("h-fit")} />
              ) : (
                <>
                  {t("resend_button")}
                  {remainingTime > 0 ? `(${getFormattedTime()})` : ""}
                </>
              )}
            </button>
          </div>
        </div>
      </Desktop>
    </>
  );
};
export default SuccessState;
