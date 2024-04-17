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

interface I_VRPHeroCard {
  id: string;
}

const VRPHeroCard = ({ id }: I_VRPHeroCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ref, inView } = useInView({ threshold: 0.1 });

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
                <Image
                  src="/images/company-logo/coinbase.png"
                  alt="Company Logo"
                  width={48}
                  height={48}
                />
                <Typography variant="p" affects="large" weight="bold">
                  Coinbase
                </Typography>
              </div>
            </div>
            <Typography
              variant="p"
              affects="small"
              className="text-neutral-light-30 dark:text-neutral-dark-30"
            >
              Company Description
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
                732
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
                1
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
              <Typography variant="p" affects="small" weight="medium">
                https://linktocompanysite.com
              </Typography>
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
              <Image
                src="/images/company-logo/coinbase.png"
                alt="Company Logo"
                width={24}
                height={24}
              />
              <Typography variant="p" affects="small" weight="bold">
                Coinbase
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
                <Link
                  href={`/programs/send-report?company=${id}`}
                  className={cn(buttonVariants({ variant: "primary-hacker" }))}
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
      <ModalForbiddden
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};
export default VRPHeroCard;
