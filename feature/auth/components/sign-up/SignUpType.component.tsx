"use client";
import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography";
import { Company, Hacker } from "@/core/ui/icons";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SignUpHacker from "./hacker/SignUpHacker.component";
import SignUpCompany from "./company/SignUpCompany.component";

const SignUpType = () => {
  const searchParams = useSearchParams();

  if (searchParams.get("type") === "hacker") {
    return <SignUpHacker />;
  }

  if (searchParams.get("type") === "company") {
    return <SignUpCompany />;
  }

  return (
    <div
      className={cn(
        "_flexbox__col__center w-full max-w-[676px] gap-14 rounded-lg p-20 dark:bg-background-main-dark"
      )}
    >
      <div className="_flexbox__col__center w-ful gap-12">
        <Typography variant="h4" weight="bold" align="center">
          Please Choose What Type of Account That You Want to Create
        </Typography>
        <div className="grid w-full grid-cols-2 gap-7">
          <Link
            href="/auth/signup?type=hacker"
            className={cn(
              "transition-color bg-main-dark _flexbox__col__center shadow-hacker",
              "group aspect-[244/236] w-full cursor-pointer active:bg-lime-lighter",
              "gap-6 rounded-lg duration-100 hover:bg-brand-hacker"
            )}
          >
            <Hacker className="group-hover:text-brand-neutral" />
            <Typography
              variant="h6"
              weight="bold"
              className="group-hover:text-brand-neutral"
            >
              Hackers
            </Typography>
          </Link>
          <Link
            href="/auth/signup?type=company"
            className={cn(
              "bg-main-dark _flexbox__col__center shadow-company",
              "transition-color group aspect-[244/236] w-full cursor-pointer",
              "gap-6 rounded-lg duration-100 hover:bg-sky-light/20 active:bg-sky-lighter"
            )}
          >
            <Company />
            <Typography variant="h6" weight="bold">
              Company
            </Typography>
          </Link>
        </div>
      </div>
      <Typography variant="p" affects="normal">
        Already have an account?{" "}
        <Link href="/auth/signin" className="ml-2 font-semibold underline">
          Sign In
        </Link>
      </Typography>
    </div>
  );
};
export default SignUpType;
