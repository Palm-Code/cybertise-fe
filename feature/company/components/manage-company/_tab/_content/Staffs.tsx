import { cn } from "@/core/lib/utils";
import { Button, Card, Input, Typography } from "@/core/ui/components";
import { FilePenLine, UserPlus, X } from "lucide-react";
import Image from "next/image";

const Staffs = () => {
  return (
    <div className="_flexbox__col__start__start gap-6">
      <div className="_flexbox__row__center__between w-full">
        <Typography variant="h5" weight="bold">
          Company Staff
        </Typography>
        <Button variant="tertiary-company" prefixIcon={<UserPlus />}>
          Add New Staff
        </Button>
      </div>
      <Card
        className={cn(
          "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
          "_flexbox__col__start__start gap-6 p-7.5"
        )}
      >
        <Typography variant="h6" weight="bold">
          Staff
        </Typography>
        <Card
          className={cn(
            "_flexbox__row__center__between w-full cursor-pointer gap-2 rounded-md px-4 py-0 pb-1",
            "border border-transparent transition-colors duration-100",
            "bg-neutral-light-100 dark:bg-neutral-dark-100"
          )}
        >
          <Input
            label="Staff 1"
            value="Kevin jordi"
            className="w-full"
            transparentBg
            readOnly
          />
          <div className="_flexbox__row__center gap-4">
            <button type="button" title="Edit">
              <FilePenLine />
            </button>
            <button type="button" title="Delete">
              <X />
            </button>
          </div>
        </Card>
        <Card
          className={cn(
            "_flexbox__row__center__between w-full cursor-pointer gap-2 rounded-md px-4 py-0 pb-1",
            "border border-transparent transition-colors duration-100",
            "bg-neutral-light-100 dark:bg-neutral-dark-100"
          )}
        >
          <Input
            label="Staff 2"
            value="Rizky Alfiansyah"
            className="w-full"
            transparentBg
            readOnly
          />
          <div className="_flexbox__row__center gap-4">
            <button type="button" title="Edit">
              <FilePenLine />
            </button>
            <button type="button" title="Delete">
              <X />
            </button>
          </div>
        </Card>
      </Card>
    </div>
  );
};
export default Staffs;
