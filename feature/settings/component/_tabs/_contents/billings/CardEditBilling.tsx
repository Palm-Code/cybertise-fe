import { cn } from "@/core/lib/utils";
import { Card, Input, Typography } from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { Banknote } from "lucide-react";

interface I_CardEditBillingProps {
  variant: "hacker" | "company" | "mediator";
}

const CardEditBilling = ({ variant }: I_CardEditBillingProps) => {
  return (
    <AnimationWrapper>
      <Mobile>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-6 rounded-xl p-7.5"
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
            <div className="_flexbox__col__start__start w-full gap-6">
              <Input type="text" label="VAT" />
              <Input type="text" label="IBAN" />
              <Input type="text" label="BIC" />
            </div>
          </form>
        </Card>
      </Mobile>
      <Desktop>
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-6 rounded-xl p-7.5"
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
          </form>
        </Card>
      </Desktop>
    </AnimationWrapper>
  );
};
export default CardEditBilling;
