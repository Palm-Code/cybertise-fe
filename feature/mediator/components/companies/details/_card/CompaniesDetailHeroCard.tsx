"use client";
import { cn } from "@/core/lib/utils";
import { I_GetCompanyDetailsSuccessResponse } from "@/core/models/mediator/companies";
import {
  Avatar,
  Card,
  Indicator,
  Separator,
  Typography,
} from "@/core/ui/components";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { Desktop, Mobile } from "@/core/ui/layout";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface I_CompaniesDetailHeroCard {
  data?: I_GetCompanyDetailsSuccessResponse["data"];
}

const CompaniesDetailHeroCard = ({ data }: I_CompaniesDetailHeroCard) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
  if (data)
    return (
      <>
        <Mobile>
          <Card
            className={cn(
              inView ? "opacity-100" : "opacity-0",
              "_flexbox__col__start__start w-full gap-4 rounded-none"
            )}
          >
            <div ref={ref} className="_flexbox__col__start__start w-full gap-4">
              <Avatar image={data?.logo} initials="C" className="h-12 w-12" />
              <div className="_flexbox__row__start__between w-full">
                <div className="_flexbox__col__start__start gap-4">
                  <div className="_flexbox__col__start__start gap-4">
                    <Typography variant="h3" weight="bold">
                      {data?.name}
                    </Typography>
                    <Indicator
                      variant={
                        data.status.toLowerCase() as keyof typeof indicatorVariants
                      }
                    >
                      {data.status}
                    </Indicator>
                  </div>
                  <Typography
                    variant="p"
                    affects="small"
                    className="!dark:text-neutral-dark-20 text-neutral-light-20"
                  >
                    {data.description}
                  </Typography>
                </div>
              </div>
              <Separator orientation="horizontal" />
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Reports resolved
                  </Typography>
                  <Typography variant="p" affects="small" weight="semibold">
                    {data.report_resolved}
                  </Typography>
                </div>
                <div className="flex flex-col gap-2">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Bounty Program
                  </Typography>
                  <Typography variant="p" affects="small" weight="semibold">
                    {data.program_count}
                  </Typography>
                </div>
                <div className="flex flex-col gap-2">
                  <Typography
                    variant="p"
                    affects="small"
                    className="!text-neutral-light-30 dark:text-neutral-dark-30"
                  >
                    Company Website
                  </Typography>
                  <Link
                    href={
                      data?.website
                        ? data?.website.startsWith("http") ||
                          data?.website.startsWith("https")
                          ? data?.website
                          : "https://" + data?.website
                        : "#"
                    }
                    target="_blank"
                    className={cn(
                      typographyVariants({ variant: "p", affects: "small" }),
                      "text-neutral-light-20 underline dark:text-neutral-dark-20"
                    )}
                  >
                    {data.website}
                  </Link>
                </div>
              </div>
            </div>
          </Card>
          <Card
            className={cn(
              "fixed top-12 rounded-none p-6 transition-opacity duration-100",
              !inView ? "z-50 opacity-100" : "opacity-0"
            )}
          >
            <div className="_flexbox__row__center__between w-full gap-9">
              <div className="grid w-full grid-cols-[auto_1fr] items-center gap-2">
                <Avatar className="h-12 w-12" image={data?.logo} initials="C" />
                <Typography variant="h4" affects="small" weight="bold">
                  {data?.name}
                </Typography>
              </div>
              <Indicator
                variant={
                  data.status.toLowerCase() as keyof typeof indicatorVariants
                }
              >
                {data.status}
              </Indicator>
            </div>
          </Card>
        </Mobile>
        <Desktop>
          <Card>
            <div className="grid w-full grid-cols-[auto_1fr] gap-9">
              <Avatar image={data?.logo} initials="C" className="h-12 w-12" />
              <div className="_flexbox__col__start__start w-full gap-12">
                <div className="_flexbox__row__start__between w-full">
                  <div className="_flexbox__col__start__start gap-9">
                    <div className="_flexbox__col__start__start gap-2">
                      <Typography
                        variant="h3"
                        weight="bold"
                        className="leading-none"
                      >
                        {data.name}
                      </Typography>
                      <Typography
                        variant="p"
                        affects="small"
                        className="!dark:text-neutral-dark-20 text-neutral-light-20"
                      >
                        {data.description}
                      </Typography>
                    </div>
                  </div>
                  <Indicator
                    variant={
                      data.status.toLowerCase() as keyof typeof indicatorVariants
                    }
                  >
                    {data.status}
                  </Indicator>
                </div>
                <div className="grid h-fit grid-flow-col gap-12">
                  <div className="grid h-full gap-2.5">
                    <Typography
                      variant="p"
                      affects="small"
                      className="!text-neutral-light-30 dark:text-neutral-dark-30"
                    >
                      Reports resolved
                    </Typography>
                    <Typography variant="p" affects="small" weight="semibold">
                      {data.report_resolved}
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
                      {data.program_count}
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
                      href={
                        data?.website.startsWith("http") ||
                        data?.website.startsWith("https")
                          ? data?.website
                          : "https://" + data?.website || "#"
                      }
                      target="_blank"
                      className={cn(
                        typographyVariants({ variant: "p", affects: "small" }),
                        "text-neutral-light-20 underline dark:text-neutral-dark-20"
                      )}
                    >
                      {data.website}
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
