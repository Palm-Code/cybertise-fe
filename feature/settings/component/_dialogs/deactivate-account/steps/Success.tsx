import { cn } from "@/core/lib/utils";
import { Button, Typography } from "@/core/ui/components";
import { OctagonX } from "lucide-react";
import { I_ModalSetup2faProps } from "../../two-factor-authentication/ModalSetup2fa";
import { logout, logoutwithoutrevalidate } from "@/service/server/auth";

const Success = ({
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
        <OctagonX className="mx-auto h-16 w-16" />
        <Typography
          variant="h4"
          weight="semibold"
          align="center"
        >
          Deactivated
        </Typography>
        <Typography
          variant="p"
          affects="normal"
          align="center"
          className="text-neutral-light-50 dark:text-neutral-dark-50"
        >
          We&apos;re very sad to see you go. Don&apos;t hesitate to come back
          again.
        </Typography>
      </div>
      <Button
        isLoading={isLoading}
        variant="default"
        fullWidth
        onClick={() => {
          logout();
        }}
      >
        Go to Homepage
      </Button>
    </div>
  );
};
export default Success;
