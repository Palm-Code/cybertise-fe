import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { Banknote } from "lucide-react";

const menus: string[] = [
  "Bank Name",
  "Account Number",
  "Holder Name",
  "VAT",
  "IBAN",
  "BIC",
];

const CardBilling = () => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6 rounded-xl p-7.5",
        "bg-neutral-light-100 dark:bg-neutral-dark-100"
      )}
    >
      <Typography variant="h6" weight="bold" className="inline-flex">
        <Banknote className="mr-4 h-8 w-8" />
        Payment Information
      </Typography>
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-2.5">
        {menus.slice(0, 3).map((menu) => (
          <Typography
            key={`menu-card-billing-${menu}`}
            variant="p"
            affects="normal"
            className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
          >
            {menu}
          </Typography>
        ))}
        <Typography variant="p" affects="normal" className="col-span-1">
          Deutsche Bank
        </Typography>
        <Typography variant="p" affects="normal" className="col-span-1">
          123456789
        </Typography>
        <Typography variant="p" affects="normal" className="col-span-1">
          Kevin
        </Typography>
      </div>
      <div className="grid w-full grid-cols-3 gap-x-6 gap-y-2.5">
        {menus.slice(3, 6).map((menu) => (
          <Typography
            key={`menu-card-billing-ID-${menu}`}
            variant="p"
            affects="normal"
            className="col-span-1 text-neutral-light-40 dark:text-neutral-dark-40"
          >
            {menu}
          </Typography>
        ))}
        <Typography variant="p" affects="normal" className="col-span-1">
          21456789
        </Typography>
        <Typography variant="p" affects="normal" className="col-span-1">
          123456789
        </Typography>
        <Typography variant="p" affects="normal" className="col-span-1">
          DEUTDEFXXXXXX
        </Typography>
      </div>
    </Card>
  );
};
export default CardBilling;
