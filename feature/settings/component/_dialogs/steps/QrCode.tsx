import { cn } from "@/core/lib/utils";
import { Button, Input, Typography } from "@/core/ui/components";
import { Copy, Info, KeyRound, X } from "lucide-react";
import { I_ModalSetup2faProps } from "../ModalSetup2fa";
import { toast } from "sonner";
import { useState } from "react";

const QrCode = ({
  data,
  isLoading = false,
  variant = "hacker",
  onClickAuthenticate = () => {},
  ...props
}: I_ModalSetup2faProps & {
  onClickAuthenticate?: () => void;
  data?: { qr: string; secret: string } | null;
}) => {
  const [copied, setCopied] = useState(false);
  const copyCode = () => {
    setCopied(true);
    navigator.clipboard.writeText(data?.secret as string);
    toast.success("Copied to clipboard");
  };
  return (
    <div
      className={cn(
        "_flexbox__col__center mx-auto w-full max-w-xl gap-12 rounded-lg",
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
          Scan or Copy the &apos;key code&apos; below to your authenticator app
          to activate your 2FA.
        </Typography>
      </div>
      {data && (
        <img
          src={data.qr}
          alt="qr code"
          width={200}
          height={200}
          className="mx-auto rounded-[10px]"
        />
      )}
      <div className="_flexbox__col__start__start w-full gap-1">
        <div
          className={cn(
            "mb-3 grid w-full grid-cols-[auto_1fr] gap-4 rounded-lg p-4",
            "bg-semantic-light-high dark:bg-semantic-dark-high"
          )}
        >
          <Info />
          <Typography variant="p" affects="normal">
            Key phrases are used to restore Authenticator in case of device loss
            or change - make sure to secure key phrases before setting up
            authenticator app.
          </Typography>
        </div>
        <div
          className={cn(
            "_flexbox__row__center w-full gap-4 rounded-md px-4",
            "bg-neutral-light-90 dark:bg-neutral-dark-90"
          )}
        >
          <Input
            transparentBg
            type="text"
            label="Key Phrase"
            readOnly
            value={data?.secret}
          />
          <Button
            variant={`tertiary-${variant}`}
            className="p-0"
            onClick={copyCode}
          >
            <Copy className="cursor-pointer" />
          </Button>
        </div>
        <Typography variant="p" affects="tiny">
          Please copy the key phrase to activate the Authenticate button
        </Typography>
      </div>
      <Button
        disabled={!copied}
        variant={`primary-${variant}`}
        fullWidth
        onClick={onClickAuthenticate}
      >
        Authenticate
      </Button>
    </div>
  );
};
export default QrCode;
