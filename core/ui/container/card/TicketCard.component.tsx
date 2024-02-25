import Image from "next/image";
import { Badge, Card, Indicator, Typography } from "../../components";
import Link from "next/link";

const TicketCard = () => {
  return (
    <Card href={"/reports/123123123"}>
      <Indicator variant="warning" className="absolute -right-4 -top-4" />
      <div className="_flexbox__row__start w-full gap-9">
        <Image
          src={"/images/company-logo/coinbase.png"}
          alt="company logo"
          width={48}
          height={48}
        />
        <div className="_flexbox__col__start w-full gap-12">
          <div className="_flexbox__row__center__between w-full">
            <div className="_flexbox__col__start w-full gap-1">
              <Typography variant="p" affects="normal">
                #123123123 - Lorem ipsum
              </Typography>
              <div className="_flexbox__row__center gap-4">
                <Badge variant="default">Public</Badge>
                <Typography
                  variant="p"
                  affects="small"
                  className="!text-neutral-light-20 dark:!text-neutral-dark-20"
                >
                  Reported 1 mo ago
                </Typography>
              </div>
            </div>
            <Typography
              variant="p"
              affects="normal"
              className="!text-neutral-light-20 dark:!text-neutral-dark-20"
            >
              2d
            </Typography>
          </div>
          <div className="grid grid-cols-4 place-items-start gap-28">
            <div className="_flexbox__col__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Vulnerability type (CWE)
              </Typography>
              <Typography variant="p" affects="small" weight="semibold">
                Path Transversal
              </Typography>
            </div>
            <div className="_flexbox__col__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Risk Level
              </Typography>
              <Badge variant="medium">Medium</Badge>
            </div>
            <div className="_flexbox__col__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Rewards
              </Typography>
              <Typography variant="p" affects="small" weight="semibold">
                $100
              </Typography>
            </div>
            <div className="_flexbox__col__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutral-light-30 dark:text-neutral-dark-30"
              >
                Status
              </Typography>
              <Indicator variant="warning" className="-m-2.5">
                Status
              </Indicator>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
export default TicketCard;
