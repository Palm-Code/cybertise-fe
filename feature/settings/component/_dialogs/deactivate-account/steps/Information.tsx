import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import { OctagonX, X } from "lucide-react";
import { I_ModalSetup2faProps } from "../../two-factor-authentication/ModalSetup2fa";

const Information = ({
  variant = "hacker",
  isLoading = false,
  error = "",
  onClickVerify = () => {},
  ...props
}: I_ModalSetup2faProps & {
  onClickVerify?: (password: string) => void;
  error?: string;
}) => {
  return (
    <div
      className={cn(
        "_flexbox__col__center mx-auto w-full max-w-xl gap-16 rounded-lg",
        "bg-background-main-light p-10 dark:bg-background-main-dark"
      )}
    >
      <div className="_flexbox__col__center w-full gap-6">
        <Button
          variant={`tertiary-${variant}`}
          prefixIcon={<X />}
          onClick={props.onClose}
          className="mr-auto p-0"
        >
          Cancel
        </Button>
        <OctagonX className="mx-auto h-16 w-16" />
        <Typography variant="h4" weight="semibold" align="center">
          Deactivate Account
        </Typography>
        <Typography
          variant="p"
          affects="normal"
          align="center"
          className="text-neutral-light-50 dark:text-neutral-dark-50"
        >
          You&apos;re about to start the process of deactivating your Sparta
          account. Your username, and public profile will no longer be viewable
          on the platform after 30 days of activation.
        </Typography>
        <Typography
          variant="h5"
          weight="semibold"
          align="left"
          className="mr-auto"
        >
          What else you should know?
        </Typography>
        <ul className="flex list-inside list-disc flex-col gap-4 text-start text-neutral-light-50 dark:text-neutral-dark-50">
          <li>
            You can restore you Sparta account if it was accidentally or
            wrongfully deactivated for up to 30 days after deactivation
          </li>
          <li>
            If you just want to use your current username or email address with
            a different Sparta account, change them instead of deactivate your
            account
          </li>
        </ul>
      </div>
      <Button
        isLoading={isLoading}
        variant="alert"
        fullWidth
        onClick={() => onClickVerify("confirmation")}
      >
        Deactivate my account
      </Button>
    </div>
  );
};
export default Information;
