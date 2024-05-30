"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card, Separator, Typography } from "@/core/ui/components";
import { buttonVariants } from "@/core/ui/components/button/base-button";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { Desktop, Mobile } from "@/core/ui/layout";
import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import ModalForbiddden from "@/core/ui/container/modals/ModalForbidden";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import { currencyFormatters } from "@/utils/formatter/currency-formatter";

interface I_VRPHeroCard {
  data?: I_GetProgramDetailsSuccessResponse["data"];
}

const VRPHeroCard = ({ data }: I_VRPHeroCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });

  if (data)
    return (
      <>
        <Mobile>
          <Card
            className={cn(
              inView ? "opacity-100" : "opacity-0",
              "rounded-none px-6 py-2 transition-opacity duration-100"
            )}
          >
            <div className="_flexbox__col__start__start w-full gap-4" ref={ref}>
              <div className="_flexbox__row__center__between w-full gap-9">
                <div className="_flexbox__col__start__start w-full gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={data.company?.logo as string}
                      alt={data.company?.name as string}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <Typography variant="p" affects="large" weight="bold">
                    {data.company?.name}
                  </Typography>
                </div>
              </div>
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                {data.company?.description}
              </Typography>
              <Separator orientation="horizontal" />
              <div className="_flexbox__col__start__start w-full gap-2">
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Reports Resolved
                </Typography>
                <Typography variant="p" affects="small" weight="medium">
                  {data.company?.report_resolved}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start w-full gap-2">
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Bounty Program
                </Typography>
                <Typography variant="p" affects="small" weight="medium">
                  {`${currencyFormatters.NumberToEUR(data.company?.lowest_bounty ?? 0)} - ${currencyFormatters.NumberToEUR(data.company?.highest_bounty ?? 0)}`}
                </Typography>
              </div>
              <div className="_flexbox__col__start__start mb-4 w-full gap-2">
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Company Website
                </Typography>
                <Link
                  href={data.company?.website ?? "#"}
                  target="_blank"
                  className={cn(
                    typographyVariants({ variant: "p", affects: "small" })
                  )}
                >
                  {data.company?.website}{" "}
                </Link>
              </div>
              <Button
                variant="primary-hacker"
                fullWidth
                prefixIcon={<Send />}
                onClick={() => setIsModalOpen(true)}
              >
                Send Report
              </Button>
            </div>
          </Card>
          <Card
            className={cn(
              "fixed top-12 z-50 rounded-none px-6 py-2 transition-opacity duration-100",
              !inView ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="_flexbox__row__center__between w-full gap-9">
              <div className="_flexbox__row__center__start w-full gap-2">
                <div className="relative h-6 w-6 overflow-hidden rounded-full">
                  <Image
                    src={data.company?.logo as string}
                    alt={data.company?.name as string}
                    fill
                    className="object-cover"
                  />
                </div>
                <Typography variant="p" affects="small" weight="bold">
                  {data.company?.name}
                </Typography>
              </div>
              <button
                title="Send Report"
                type="button"
                className={cn(
                  buttonVariants({ variant: "primary-hacker" }),
                  "rounded-2xl px-4 py-2"
                )}
                onClick={() => setIsModalOpen(true)}
              >
                <Send />
              </button>
            </div>
          </Card>
          <ModalForbiddden
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </Mobile>
        <Desktop>
          <Card>
            <div className="grid w-full grid-cols-[auto_1fr] gap-9">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image
                  src={data.company?.logo as string}
                  alt={data.company?.name as string}
                  fill
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
                        {data.company?.name}
                      </Typography>
                      <Typography
                        variant="p"
                        affects="small"
                        className="!dark:text-neutral-dark-20 text-neutral-light-20"
                      >
                        {data.company?.description}{" "}
                      </Typography>
                    </div>
                  </div>
                  <Link
                    href={`/programs/send-report?programs=${data.id}`}
                    className={cn(
                      buttonVariants({ variant: "primary-hacker" })
                    )}
                  >
                    <Send className="mr-2.5" />
                    Send Report
                  </Link>
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
                      {data.company?.report_resolved ?? 0}
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
                      {`${currencyFormatters.NumberToEUR(data.company?.lowest_bounty ?? 0)} - ${currencyFormatters.NumberToEUR(data.company?.highest_bounty ?? 0)}`}
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
                      href={data.company?.website ?? "#"}
                      target="_blank"
                      className={cn(
                        typographyVariants({ variant: "p", affects: "small" }),
                        "text-neutral-light-20 underline dark:text-neutral-dark-20"
                      )}
                    >
                      {data.company?.website}{" "}
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
export default VRPHeroCard;
