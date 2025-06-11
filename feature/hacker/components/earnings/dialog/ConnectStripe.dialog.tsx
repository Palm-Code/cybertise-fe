import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/core/ui/components/dialog/dialog";
import { DialogProps } from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

type I_ConnectStripeDialogProps = DialogProps & {
  url: string;
};

export const ConnectStripeDialog = ({
  url,
  ...props
}: I_ConnectStripeDialogProps) => {
  const t = useTranslations();

  console.log(url);

  return (
    <Dialog {...props}>
      <DialogContent
        showCloseButton={false}
        className="max-sm:max-w-80 lg:!px-10 lg:!pb-20 lg:!pt-10"
      >
        <DialogTitle>
          <DialogClose
            className={cn(
              "grid grid-cols-[auto_1fr] items-center gap-2 md:mb-6"
            )}
          >
            <X />
            <Typography
              variant="p"
              affects="normal"
            >
              {t("Common.button_cancel")}
            </Typography>
          </DialogClose>
        </DialogTitle>
        <div className={cn("flex w-full flex-col items-center gap-4 md:gap-6")}>
          <div
            className={cn("flex w-full flex-col items-center gap-2 md:gap-4")}
          >
            <Typography
              variant="h4"
              weight="bold"
              align="center"
            >
              {t("Earnings.connect_stripe.title")}
            </Typography>
            <Typography
              variant="p"
              affects="normal"
              align="center"
              className={cn("text-neutral-light-50 dark:text-neutral-dark-50")}
            >
              {t("Earnings.connect_stripe.description")}
            </Typography>
          </div>
          <div className={cn("flex w-full flex-col gap-2 md:gap-4")}>
            <Typography
              variant="h5"
              weight="bold"
            >
              {t("Earnings.connect_stripe.subtitle")}
            </Typography>
            <ul
              className={cn(
                "flex w-full list-inside list-disc flex-col gap-2 md:gap-4"
              )}
            >
              <li>{t("Earnings.connect_stripe.step_1")}</li>
              <li>{t("Earnings.connect_stripe.step_2")}</li>
              <li>{t("Earnings.connect_stripe.step_3")}</li>
            </ul>
          </div>
        </div>
        <Button
          asLink
          href={url}
          fullWidth
          variant="primary-hacker"
          size="default"
          className="mt-10"
        >
          {t("Earnings.connect_stripe.button")}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
