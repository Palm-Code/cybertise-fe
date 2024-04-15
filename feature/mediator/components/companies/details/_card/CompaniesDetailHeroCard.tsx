"use client";
import { cn } from "@/core/lib/utils";
import { Card, Indicator, Separator, Typography } from "@/core/ui/components";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { Desktop, Mobile } from "@/core/ui/layout";
import Image from "next/image";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface I_CompaniesDetailHeroCard {
  id: string;
}

const CompaniesDetailHeroCard = ({ id }: I_CompaniesDetailHeroCard) => {
  const { ref, inView } = useInView({ threshold: 0.1 });
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
            <Image
              src="/images/company-logo/coinbase.png"
              alt="Company Logo"
              width={48}
              height={48}
            />
            <div className="_flexbox__row__start__between w-full">
              <div className="_flexbox__col__start__start gap-4">
                <div className="_flexbox__col__start__start gap-4">
                  <Typography variant="h3" weight="bold">
                    Coinbase
                  </Typography>
                  <Indicator variant="clear">Published</Indicator>
                </div>
                <Typography
                  variant="p"
                  affects="small"
                  className="!dark:text-neutral-dark-20 text-neutral-light-20"
                >
                  Company description{" "}
                </Typography>
              </div>
            </div>
            <Separator orientation="horizontal" />
            <div className="grid h-fit gap-2">
              <div className="grid h-full gap-2">
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Reports resolved
                </Typography>
                <Typography variant="p" affects="small" weight="semibold">
                  732
                </Typography>
              </div>
              <div className="grid h-full gap-2">
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Bounty Program
                </Typography>
                <Typography variant="p" affects="small" weight="semibold">
                  1
                </Typography>
              </div>
              <div className="grid h-full gap-2">
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Company Website
                </Typography>
                <Link
                  href={"https://linktocompanysite.com"}
                  target="_blank"
                  className={cn(
                    typographyVariants({ variant: "p", affects: "small" }),
                    "text-neutral-light-20 underline dark:text-neutral-dark-20"
                  )}
                >
                  https://linktocompanysite.com
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
            <div className="_flexbox__row__center__start w-full gap-2">
              <Image
                src="/images/company-logo/coinbase.png"
                alt="Company Logo"
                width={48}
                height={48}
              />
              <Typography variant="h4" affects="small" weight="bold">
                Coinbase
              </Typography>
            </div>
            <Indicator variant="clear">Published</Indicator>
          </div>
        </Card>
      </Mobile>
      <Desktop>
        <Card>
          <div className="_flexbox__row__start__start w-full gap-9">
            <Image
              src="/images/company-logo/coinbase.png"
              alt="Company Logo"
              width={48}
              height={48}
            />
            <div className="_flexbox__col__start__start w-full gap-12">
              <div className="_flexbox__row__start__between w-full">
                <div className="_flexbox__col__start__start gap-9">
                  <div className="_flexbox__col__start__start gap-2">
                    <Typography variant="h3" weight="bold">
                      Coinbase
                    </Typography>
                    <Typography
                      variant="p"
                      affects="small"
                      className="!dark:text-neutral-dark-20 text-neutral-light-20"
                    >
                      Company description{" "}
                    </Typography>
                  </div>
                </div>
                <Indicator variant="clear">Published</Indicator>
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
                    732
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
                    1
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
                    href={"https://linktocompanysite.com"}
                    target="_blank"
                    className={cn(
                      typographyVariants({ variant: "p", affects: "small" }),
                      "text-neutral-light-20 underline dark:text-neutral-dark-20"
                    )}
                  >
                    https://linktocompanysite.com
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
