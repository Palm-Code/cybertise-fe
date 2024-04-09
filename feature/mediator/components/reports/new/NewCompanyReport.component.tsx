"use client";
import { cn } from "@/core/lib/utils";
import { Button, Card, SelectDropdown } from "@/core/ui/components";
import Typography, {
  typographyVariants,
} from "@/core/ui/components/typography/typography";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useState } from "react";

const NewCompanyReport = () => {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (category: string) => {
    setActiveCard((prevActiveCard) =>
      prevActiveCard === category ? null : category
    );
  };

  return (
    <div className="_flexbox__col__start__start min-h-full w-full gap-0 rounded-2xl">
      <div
        className={cn(
          "_flexbox__col__start__start sticky top-0 z-30",
          "h-fit w-full gap-3 bg-background-page-light pt-12 dark:bg-background-page-dark"
        )}
      >
        <Card className="rounded-2xl rounded-b-none px-8 py-6">
          <div
            className={cn(
              typographyVariants({ variant: "h5", weight: "bold" }),
              "inline-flex cursor-pointer items-center gap-5"
            )}
          >
            <X onClick={() => {}} />
            Create Company Ticket
          </div>
        </Card>
        <div
          className={cn(
            "sticky top-[8.15rem] z-30 h-4 w-full rounded-t-xl",
            "bg-background-main-light pt-0 dark:bg-background-main-dark"
          )}
        ></div>
      </div>
      <div className="_flexbox__row__start__start relative h-full w-full gap-6">
        <div className="h-full w-full overflow-y-auto">
          <Card
            className={cn(
              "_flexbox__col__start__start h-full gap-6",
              "overflow-y-auto rounded-b-xl rounded-t-none px-8 pb-12 pt-8"
            )}
          >
            <Typography variant="h5" weight="bold">
              Company Ticket #123123123 - Lorem ipsum
            </Typography>
            <Card className="_flexbox__col__start rounded-md bg-neutral-light-100 px-4 py-4.5 dark:bg-neutral-dark-100">
              <button
                type="button"
                title="Expand"
                className={cn(
                  "_flexbox__row__center__between w-full gap-6 focus:outline-none active:outline-none",
                  "text-neutral-light-30 dark:text-neutral-dark-30"
                )}
                // onClick={handleCardClick}
              >
                <Typography variant="p" affects="normal">
                  Hacker Ticket: Initial
                </Typography>
                <ChevronDown
                  className={cn(
                    "cursor-pointer transition-transform duration-300",
                    activeCard ? "rotate-90" : "rotate-0"
                  )}
                />
              </button>
              <AnimatePresence>
                {activeCard && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, marginTop: "0" }}
                    animate={{ height: "auto", marginTop: "24px" }}
                    exit={{ height: 0, marginTop: "0" }}
                    transition={{ duration: 0.3 }}
                    className="w-full overflow-hidden"
                  >
                    <div className="grid w-full grid-cols-3 gap-6">test</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
            <Button variant="primary-mediator">Create Company Ticket</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};
export default NewCompanyReport;
