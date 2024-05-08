import { cn } from "@/core/lib/utils";
import { BaseModal, Button, Typography } from "@/core/ui/components";
import { buttonVariants } from "@/core/ui/components/button/base-button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface I_ModalSuccessSubmitProps {
  isOpen: boolean;
}

const ModalSuccessSubmit = ({ isOpen }: I_ModalSuccessSubmitProps) => {
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
            Your Report Submited!
          </Typography>
          <Typography variant="p" affects="normal" className="mt-2">
            We have sent your report to the Mediator for review. You can access
            your Hacker ticket directly on the dashboard or report menu.
          </Typography>
        </div>
        <div className="flex w-full items-center gap-6">
          <Link
            href="/dashboard"
            className={buttonVariants({
              variant: "secondary-hacker",
              className: "w-full",
            })}
          >
            Back to Dasboard
          </Link>
          <Link
            href="/reports"
            className={buttonVariants({
              variant: "primary-hacker",
              className: "w-full",
            })}
          >
            Go to my Reports
          </Link>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalSuccessSubmit;
