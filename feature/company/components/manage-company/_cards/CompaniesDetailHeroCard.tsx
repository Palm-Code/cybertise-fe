"use client";
import { cn } from "@/core/lib/utils";
import { I_GetUserProfileSuccessResponse } from "@/core/models/common/get_profile";
import { Card, Indicator, Separator, Typography } from "@/core/ui/components";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { Desktop, Mobile } from "@/core/ui/layout";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface I_CompaniesDetailHeroCard {
  data?: I_GetUserProfileSuccessResponse["data"];
}

const CompaniesDetailHeroCard = ({ data }: I_CompaniesDetailHeroCard) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  return (
    <>
      <Mobile>
        <Card
          className={cn("rounded-none", inView ? "opacity-100" : "opacity-0")}
        >
          <div className="_flexbox__col__start__start w-full gap-4" ref={ref}>
            <div className="_flexbox__row__start__between w-full">
              <div className="_flexbox__col__start__start gap-4">
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={data?.image as string}
                    alt={data?.name as string}
                    fill
                    sizes="100%"
                    className="object-cover"
                  />
                </div>
                <div className="_flexbox__col__start__start gap-2">
                  <Typography
                    variant="h3"
                    weight="bold"
                    className="leading-none"
                  >
                    {data?.name}
                  </Typography>
                  <Typography
                    variant="p"
                    affects="small"
                    className="!dark:text-neutral-dark-20 text-neutral-light-20"
                  >
                    {data?.about}
                  </Typography>
                </div>
              </div>
              <Indicator
                variant={
                  data?.company_status
                    ? (data.company_status.toLowerCase() as keyof typeof Indicator)
                    : "warning"
                }
              >
                {data?.company_status}
              </Indicator>
            </div>
            <Separator orientation="horizontal" />
            <div className="_flexbox__col__start__start gap-2">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Reports resolved
                </Typography>
                <Typography variant="p" affects="small" weight="semibold">
                  {data?.company_reports_resolved}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Bounty Program
                </Typography>
                <Typography variant="p" affects="small" weight="semibold">
                  {data?.company_program_count}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Company Website
                </Typography>
                <Link
                  href={data?.website || "#"}
                  target="_blank"
                  className={cn(
                    typographyVariants({ variant: "p", affects: "small" }),
                    "text-neutral-light-20 underline dark:text-neutral-dark-20"
                  )}
                >
                  {data?.website}
                </Link>
              </div>
            </div>
          </div>
        </Card>
        <Card
          className={cn(
            "fixed top-12 z-50 rounded-none px-6 py-2 transition-opacity duration-100",
            !inView ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="_flexbox__row__start__between w-full">
            <div className="_flexbox__row__center__start gap-2">
              <div className="relative h-6 w-6 overflow-hidden rounded-full">
                <Image
                  src={data?.image as string}
                  alt={data?.name as string}
                  fill
                  sizes="100%"
                  className="object-cover"
                />
              </div>
              <Typography variant="p" affects="small" weight="semibold">
                {data?.name}
              </Typography>
            </div>
            <Indicator
              variant={
                data?.company_status
                  ? (data.company_status.toLowerCase() as keyof typeof Indicator)
                  : "warning"
              }
            >
              {data?.company_status}
            </Indicator>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card>
          <div className="grid w-full grid-cols-[auto_1fr] gap-9">
            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={data?.image as string}
                alt={data?.name as string}
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
            <div className="_flexbox__col__start__start w-full gap-12">
              <div className="_flexbox__row__start__between w-full">
                <div className="_flexbox__col__start__start gap-9">
                  <div className="_flexbox__col__start__start gap-2">
                    <Typography
                      variant="h3"
                      weight="bold"
                      className="leading-none"
                    >
                      {data?.name}
                    </Typography>
                    <Typography
                      variant="p"
                      affects="small"
                      className="!dark:text-neutral-dark-20 text-neutral-light-20"
                    >
                      {data?.about}
                    </Typography>
                  </div>
                </div>
                <Indicator
                  variant={
                    data?.company_status
                      ? (data.company_status.toLowerCase() as keyof typeof Indicator)
                      : "warning"
                  }
                >
                  {data?.company_status}
                </Indicator>
              </div>
              <div className="grid h-fit max-h-12 grid-flow-col gap-12">
                <div className="grid h-full gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Reports resolved
                  </Typography>
                  <Typography variant="p" affects="small" weight="semibold">
                    {data?.company_reports_resolved}
                  </Typography>
                </div>
                <Separator orientation="vertical" />
                <div className="grid h-full gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Bounty Program
                  </Typography>
                  <Typography variant="p" affects="small" weight="semibold">
                    {data?.company_program_count}
                  </Typography>
                </div>
                <Separator orientation="vertical" />
                <div className="grid h-full gap-2.5">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Company Website
                  </Typography>
                  <Link
                    href={data?.website || "#"}
                    target="_blank"
                    className={cn(
                      typographyVariants({ variant: "p", affects: "small" }),
                      "text-neutral-light-20 underline dark:text-neutral-dark-20"
                    )}
                  >
                    {data?.website}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Desktop>
    </>
  );
};
export default CompaniesDetailHeroCard;
