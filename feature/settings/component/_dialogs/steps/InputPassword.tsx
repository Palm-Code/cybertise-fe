import { cn } from "@/core/lib/utils";
import { Button, PasswordInput, Typography } from "@/core/ui/components";
import { typographyVariants } from "@/core/ui/components/typography/typography";
import { KeyRound, X } from "lucide-react";
import Link from "next/link";
import { I_ModalSetup2faProps } from "../ModalSetup2fa";
import { useState } from "react";

const InputPassword = ({
  variant = "hacker",
  isLoading = false,
  onClickVerify = () => {},
  ...props
}: I_ModalSetup2faProps & {
  onClickVerify?: (password: string) => void;
}) => {
  const [password, setPassword] = useState("");
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
        <KeyRound className="h-16 w-16" />
        <Typography variant="h4" weight="semibold">
          Setup Authenticator
        </Typography>
        <Typography variant="p" affects="normal" align="center">
          Protecting your account is our top priority. Please confirm your
          activity by entering your login password.
        </Typography>
      </div>
      <div className="_flexbox__col__start__start w-full gap-2">
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
        />
        <Link
          href="/forgot-password"
          className={cn(
            typographyVariants({
              variant: "p",
              affects: "normal",
              weight: "semibold",
            })
          )}
        >
          Forgot Password ?
        </Link>
      </div>
      <Button
        disabled={password.length === 0 || isLoading}
        isLoading={isLoading}
        variant={`primary-${variant}`}
        fullWidth
        onClick={() => onClickVerify(password)}
      >
        Verify
      </Button>
    </div>
  );
};
export default InputPassword;
