"use client";
import { cn } from "@/core/lib/utils";
import { Card, Input, PasswordInput, Typography } from "@/core/ui/components";
import { AnimationWrapper, Desktop } from "@/core/ui/layout";

const CardEditEmail = () => {
  return (
    <AnimationWrapper>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-8">
          <Card
            className={cn(
              "_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12",
              "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Typography variant="h6" weight="bold">
              Confirm Current Email
            </Typography>
            <Input
              type="email"
              label="Current email"
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
            />
          </Card>
          <Card
            className={cn(
              "_flexbox__col__start__start w-full gap-6 xl:px-8 xl:py-12",
              "bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Typography variant="h6" weight="bold">
              New Email
            </Typography>
            <Input
              type="email"
              label="New Email"
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
            />
            <PasswordInput
              type="password"
              label="Password"
              wrapperClassName="bg-neutral-light-100 dark:bg-neutral-dark-100"
            />
          </Card>
        </div>
      </Desktop>
    </AnimationWrapper>
  );
};
export default CardEditEmail;
