"use client";
import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography/typography";
import { Hacker } from "@/core/ui/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SignUpHacker from "./hacker/SignUpHacker.component";
import SignUpCompany from "./company/SignUpCompany.component";
import { Building2 } from "lucide-react";
import { Desktop, Mobile } from "@/core/ui/layout";
import { useTranslations } from "next-intl";

const SignUpType = () => {
  const t = useTranslations("SignUp");
  const searchParams = useSearchParams();

  if (searchParams.get("type") === "hacker") {
    return <SignUpHacker />;
  }

  if (searchParams.get("type") === "company") {
    return <SignUpCompany />;
  }

  return (
    <>
      <Mobile className="_flexbox__col__center">
        <div
          className={cn(
            "_flexbox__col__center relative mx-auto w-full max-w-[676px] gap-14 rounded-lg",
            "px-6 py-8"
          )}
        >
          <div className="_flexbox__col__center w-full gap-8">
            <Typography variant="h5" weight="semibold" align="center">
              {t("title")}
            </Typography>
            <div className="flex w-full flex-col gap-7">
              <Link
                href="/auth/signup?type=hacker"
                className={cn(
                  "transition-color _flexbox__row__center bg-background-main-light shadow-hacker dark:bg-background-main-dark",
                  "group w-full cursor-pointer px-6 py-8 active:bg-lime-lighter-light",
                  "gap-4 rounded-lg duration-100 hover:bg-brand-hacker"
                )}
              >
                <Hacker className="group-hover:text-brand-neutral" />
                <Typography
                  variant="h6"
                  weight="bold"
                  className="group-hover:text-brand-neutral"
                >
                  {t("hacker_type")}
                </Typography>
              </Link>
              <Link
                href="/auth/signup?type=company"
                className={cn(
                  "_flexbox__row__center bg-background-main-light shadow-company dark:bg-background-main-dark",
                  "transition-color group w-full cursor-pointer px-6 py-8",
                  "gap-4 rounded-lg duration-100 hover:bg-sky-light active:bg-sky-lighter"
                )}
              >
                <Building2 className="size-8 group-hover:text-brand-neutral" />
                <Typography
                  variant="h6"
                  weight="bold"
                  className="group-hover:text-brand-neutral"
                >
                  {t("company_type")}
                </Typography>
              </Link>
            </div>
          </div>
        </div>
        <Typography
          variant="p"
          affects="normal"
          className="absolute bottom-8"
          align="center"
        >
          {t("footer")}{" "}
          <Link href="/auth/signin" className="ml-2 font-semibold underline">
            {t("link")}
          </Link>
        </Typography>
      </Mobile>
      <Desktop>
        <div
          className={cn(
            "_flexbox__col__center mx-auto w-full max-w-[676px] gap-14 rounded-lg",
            "bg-background-main-light p-20 dark:bg-background-main-dark"
          )}
        >
          <div className="_flexbox__col__center w-full gap-12">
            <Typography variant="h4" weight="bold" align="center">
              {t("title")}
            </Typography>
            <div className="grid w-full grid-cols-2 gap-7">
              <Link
                href="/auth/signup?type=hacker"
                className={cn(
                  "transition-color _flexbox__col__center bg-background-main-light shadow-hacker dark:bg-background-main-dark",
                  "group aspect-[244/236] w-full cursor-pointer active:bg-lime-lighter-light",
                  "gap-6 rounded-lg duration-100 hover:bg-brand-hacker"
                )}
              >
                <Hacker className="group-hover:text-brand-neutral" />
                <Typography
                  variant="h6"
                  weight="bold"
                  className="group-hover:text-brand-neutral"
                >
                  {t("hacker_type")}
                </Typography>
              </Link>
              <Link
                href="/auth/signup?type=company"
                className={cn(
                  "_flexbox__col__center bg-background-main-light shadow-company dark:bg-background-main-dark",
                  "transition-color group aspect-[244/236] w-full cursor-pointer",
                  "gap-6 rounded-lg duration-100 hover:bg-sky-light active:bg-sky-lighter"
                )}
              >
                <Building2 className="size-8 group-hover:text-brand-neutral" />
                <Typography
                  variant="h6"
                  weight="bold"
                  className="group-hover:text-brand-neutral"
                >
                  {t("company_type")}
                </Typography>
              </Link>
            </div>
          </div>
          <Typography variant="p" affects="normal">
            {t("footer")}{" "}
            <Link href="/auth/signin" className="ml-2 font-semibold underline">
              {t("link")}
            </Link>
          </Typography>
        </div>
      </Desktop>
    </>
  );
};
export default SignUpType;
