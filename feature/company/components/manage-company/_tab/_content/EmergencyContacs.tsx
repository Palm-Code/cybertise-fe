import { cn } from "@/core/lib/utils";
import { Button, Card, Input, Typography } from "@/core/ui/components";
import { FilePenLine, UserPlus, X } from "lucide-react";
import Image from "next/image";

const EmergencyContacs = () => {
  return (
    <div className="_flexbox__col__start__start gap-6">
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          Emergency Contact
        </Typography>
        <Button variant="tertiary-company" prefixIcon={<FilePenLine />}>
          Edit Emergency Contact
        </Button>
      </div>
      <Card
        className={cn(
          "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
          "_flexbox__col__start__start gap-6 p-7.5"
        )}
      >
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
  );
};
export default EmergencyContacs;
