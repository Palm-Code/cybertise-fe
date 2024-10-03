"use client";
import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography/typography";
import { Desktop, Mobile } from "@/core/ui/layout";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../../components";
import { useSearchParams } from "next/navigation";
import { useGetAccessToken } from "@/core/react-query/client";
import { useTranslations } from "next-intl";

interface I_AuthorizeContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

let firstRender = true;
const AuthorizeContainer = (props: I_AuthorizeContainerProps) => {
  const t = useTranslations("Authorize");
  const searchParams = useSearchParams();
  const code = searchParams.get("code") as string;
  const { mutate } = useGetAccessToken();

  useEffect(() => {
    if (code && firstRender) {
      firstRender = false;
      mutate({ code });
    }
  }, [firstRender]);

  return (
    <>
      <Mobile>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg ",
            "_flexbox__col__center gap-12",
            props.noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__row__center w-full gap-6">
            <Loader className="h-12 w-12 animate-spin transition-all delay-1000 duration-1000" />
            <Typography variant="p" affects="large">
              {t("title")}
            </Typography>
          </div>
          <Typography variant="p" affects="large" align="center">
            {t("description")}
          </Typography>
          <Button variant="default" onClick={() => mutate({ code })}>
            {t("redirect_button")}
          </Button>
        </div>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "mx-auto w-full max-w-[553px] rounded-lg !bg-transparent",
            "_flexbox__col__center gap-12",
            props.noPadding ? "p-0" : "px-10 py-20",
            props.className
          )}
          {...props}
        >
          <div className="_flexbox__row__center w-full gap-6">
            <Loader className="h-12 w-12 animate-spin transition-all delay-1000 duration-1000" />
            <Typography variant="p" affects="large" align="center">
              {t("title")}
            </Typography>
          </div>
          <Typography variant="p" affects="large" align="center">
            {t("description")}
          </Typography>
          <Button variant="default" onClick={() => mutate({ code })}>
            {t("redirect_button")}
          </Button>
        </div>
      </Desktop>
    </>
  );
};
export default AuthorizeContainer;
