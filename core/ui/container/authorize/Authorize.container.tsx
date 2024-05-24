"use client";
import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography/typography";
import { Desktop, Mobile } from "@/core/ui/layout";
import { Loader } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "../../components";
import { useSearchParams } from "next/navigation";
import { useGetAccessToken } from "@/core/react-query/client";

interface I_AuthorizeContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  noPadding?: boolean;
}

let firstRender = true;
const AuthorizeContainer = (props: I_AuthorizeContainerProps) => {
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
              You are being redirected, please wait....
            </Typography>
          </div>
          <Typography variant="p" affects="large" align="center">
            If you are not redirected in few seconds, please click this button
          </Typography>
          <Button variant="default" onClick={() => mutate({ code })}>
            Continue
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
              You are being redirected, please wait....
            </Typography>
          </div>
          <Typography variant="p" affects="large" align="center">
            If you are not redirected, please click this button
          </Typography>
          <Button variant="default">Continue</Button>
        </div>
      </Desktop>
    </>
  );
};
export default AuthorizeContainer;
