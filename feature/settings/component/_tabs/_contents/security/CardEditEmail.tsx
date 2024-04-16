"use client";
import { Card, Input, PasswordInput, Typography } from "@/core/ui/components";
import { AnimationWrapper, Desktop } from "@/core/ui/layout";

const CardEditEmail = () => {
  return (
    <AnimationWrapper>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-8">
          <Card className="_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12">
            <Typography variant="h6" weight="bold">
              Confirm Current Email
            </Typography>
            <Input type="email" label="Current email" />
          </Card>
          <Card className="_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12">
            <Typography variant="h6" weight="bold">
              New Email
            </Typography>
            <Input type="email" label="New Email" />
            <PasswordInput type="password" label="Password" />
          </Card>
        </div>
      </Desktop>
    </AnimationWrapper>
  );
};
export default CardEditEmail;
