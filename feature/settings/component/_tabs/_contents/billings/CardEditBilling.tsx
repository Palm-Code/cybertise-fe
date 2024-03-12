import { cn } from "@/core/lib/utils";
import { Button, Card, Input, Typography } from "@/core/ui/components";
import { Banknote } from "lucide-react";

interface I_CardEditBillingProps {
  onClickDiscard: () => void;
}

const CardEditBilling = ({ onClickDiscard }: I_CardEditBillingProps) => {
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
      <form action="" className="_flexbox__col__start__start w-full gap-6">
        <Input type="text" label="Bank name" />
        <Input
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          label="Account Number"
        />
        <Input type="text" label="Holder Name" />
        <div className="grid w-full grid-cols-3 gap-x-6">
          <Input type="text" label="VAT" />
          <Input type="text" label="IBAN" />
          <Input type="text" label="BIC" />
        </div>
        <div className="_flexbox__row__center gap-8">
          <Button
            variant="secondary-hacker"
            type="button"
            onClick={onClickDiscard}
          >
            Discard
          </Button>
          <Button variant="primary-hacker">Save Changes</Button>
        </div>
      </form>
    </Card>
  );
};
export default CardEditBilling;
