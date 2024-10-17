"use client";
import { Button, Typography } from "@/core/ui/components";
import Image from "next/image";

const GlobalError = ({ reset }: { reset: () => void }) => {
  return (
    <div className="_flexbox__col__center relative min-h-screen gap-2.5 overflow-hidden bg-background-main-dark p-8">
      <Image
        src="/sparta-logo-dark.svg"
        alt="sparta logo"
        width={211}
        height={78}
        className="absolute top-8 mx-auto"
      />
      <div className="_flexbox__col__center relative z-20 mx-auto w-fit max-w-3xl gap-2.5">
        <Image
          src={"/icons/500.svg"}
          alt="500"
          width={684}
          height={332}
          className="mx-auto h-24 w-48 xl:h-full xl:w-full"
        />
        <Typography variant="p" className="text-[56px] !text-neutral-light-40">
          Oops!
        </Typography>
        <Typography
          variant="p"
          affects="large"
          className="!text-neutral-light-40"
          align="center"
        >
          We&apos;re experiencing an internal server error. Please try again
          later.
        </Typography>
        <Button
          onClick={reset}
          variant="primary-hacker"
          className="!w-full !border-white !bg-white !text-neutral-dark-100 md:!w-fit"
        >
          Try Again
        </Button>
      </div>
      <div className="absolute -bottom-1/3 z-0 mx-auto aspect-[1440/392] w-full -translate-y-1/2 rounded-t-full bg-custom-error blur-[150px] xl:-bottom-2/3"></div>
      <Image
        src="/icons/error-dot.svg"
        alt="error dot"
        width={322}
        height={322}
        className="absolute -left-16 top-1/2 aspect-square h-[113px] w-[113px] -translate-y-1/2 xl:-left-36 xl:w-[322px]"
      />
      <Image
        src="/icons/error-dot.svg"
        alt="error dot"
        width={322}
        height={322}
        className="absolute -right-16 bottom-0 aspect-square h-[113px] w-[113px] xl:-right-36 xl:w-[322px]"
      />
    </div>
  );
};
export default GlobalError;
