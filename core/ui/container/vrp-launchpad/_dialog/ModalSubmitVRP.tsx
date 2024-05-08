import { cn } from "@/core/lib/utils";
import { BaseModal, Typography } from "@/core/ui/components";
import { buttonVariants } from "@/core/ui/components/button/base-button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface I_ModalSubmitVRPProps {
  isOpen: boolean;
  titleText?: string;
  variant?: "hacker" | "company" | "mediator";
}

const ModalSubmitVRP = ({
  isOpen,
  titleText = "We have sent your report to the Mediator for review",
  variant = "company",
}: I_ModalSubmitVRPProps) => {
  return (
    <BaseModal isOpen={isOpen}>
      <div
        className={cn(
          "relative mx-auto w-fit max-w-[602px] rounded-lg p-20",
          "_flexbox__col__start__start gap-12",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__center w-full gap-6">
          <CheckCircle className="h-16 w-16 text-semantic-light-success dark:text-semantic-dark-success" />
          <Typography variant="h5" weight="bold">
            Your VRP Submited!
          </Typography>
          <Typography variant="p" affects="normal" className="mt-2">
            {titleText}
          </Typography>
        </div>
        <div className="flex w-full items-center gap-6">
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: `secondary-${variant}`,
              className: "w-full",
            })}
          >
            Back to Dasboard
          </Link>
          <Link
            href="/vrp-launchpad"
            className={buttonVariants({
              variant: `primary-${variant}`,
              className: "w-full",
            })}
          >
            Go to my VRP
          </Link>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalSubmitVRP;
