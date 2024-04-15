import { cn } from "@/core/lib/utils";
import { Button, Card, Typography } from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import { FilePenLine } from "lucide-react";
import Image from "next/image";

const CompanyDetails = () => {
  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start gap-6">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h5" weight="bold">
              Company Details
            </Typography>
            <Button
              variant="tertiary-company"
              prefixIcon={<FilePenLine />}
              className="p-0"
            />
          </div>
          <Card
            className={cn(
              "rounded-[10px]",
              "_flexbox__col__start__start gap-6 px-4 py-7.5"
            )}
          >
            <Typography variant="h6" weight="semibold">
              Company Information
            </Typography>
            <div className="grid w-full grid-cols-1 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Logo
                </Typography>
                <Image
                  src="/images/company-logo/coinbase.png"
                  alt="Company Logo"
                  width={48}
                  height={48}
                />
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Name
                </Typography>
                <Typography variant="p" affects="normal">
                  Company Name
                </Typography>
              </div>
            </div>
            <div className="_flexbox__col__start__start w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                About Company
              </Typography>
              <Typography variant="p" affects="normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </div>
          </Card>
          <Card
            className={cn(
              "rounded-[10px]",
              "_flexbox__col__start__start gap-6 px-4 py-7.5"
            )}
          >
            <Typography variant="h6" weight="semibold">
              Company Account Details
            </Typography>
            <div className="grid w-full grid-cols-1 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Registered email
                </Typography>
                <Typography variant="p" affects="normal">
                  email@example.com
                </Typography>
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Website
                </Typography>
                <Typography variant="p" affects="normal">
                  companywebsite.com
                </Typography>
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Phone number
                </Typography>
                <Typography variant="p" affects="normal">
                  +47092031911
                </Typography>
              </div>
            </div>
          </Card>
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start gap-6">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h5" weight="bold">
              Company Details
            </Typography>
            <Button variant="tertiary-company" prefixIcon={<FilePenLine />}>
              Edit Company Details
            </Button>
          </div>
          <Card
            className={cn(
              "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
              "_flexbox__col__start__start gap-6 p-7.5"
            )}
          >
            <Typography variant="h6" weight="bold">
              Company Information
            </Typography>
            <div className="grid w-full grid-cols-2 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Logo
                </Typography>
                <Image
                  src="/images/company-logo/coinbase.png"
                  alt="Company Logo"
                  width={48}
                  height={48}
                />
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Name
                </Typography>
                <Typography variant="p" affects="normal">
                  Company Name
                </Typography>
              </div>
            </div>
            <div className="_flexbox__col__start__start w-full gap-2.5">
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                About Company
              </Typography>
              <Typography variant="p" affects="normal">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem
                ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </div>
          </Card>
          <Card
            className={cn(
              "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
              "_flexbox__col__start__start gap-6 p-7.5"
            )}
          >
            <Typography variant="h6" weight="bold">
              Company Account Details
            </Typography>
            <div className="grid w-full grid-cols-2 gap-6">
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Registered email
                </Typography>
                <Typography variant="p" affects="normal">
                  email@example.com
                </Typography>
              </div>
              <div className="_flexbox__col__start__start gap-2.5">
                <Typography
                  variant="p"
                  affects="normal"
                  className="text-neutral-light-40 dark:text-neutral-dark-40"
                >
                  Company Website
                </Typography>
                <Typography variant="p" affects="normal">
                  companywebsite.com
                </Typography>
              </div>
            </div>
            <Typography
              variant="p"
              affects="normal"
              className="text-neutral-light-40 dark:text-neutral-dark-40"
            >
              Phone number
            </Typography>
            <Typography variant="p" affects="normal">
              +47092031911
            </Typography>
          </Card>
        </div>
      </Desktop>
    </>
  );
};
export default CompanyDetails;
