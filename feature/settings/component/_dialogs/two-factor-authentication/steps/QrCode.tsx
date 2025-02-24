import { cn } from "@/core/lib/utils";
import { Button, Input, Tooltip, Typography } from "@/core/ui/components";
import { Copy, Info, KeyRound, X } from "lucide-react";
import { I_ModalSetup2faProps } from "../ModalSetup2fa";
import { toast } from "sonner";
import { useState } from "react";
import { buttonVariants } from "@/core/ui/components/button/base-button";
import { useTranslations } from "next-intl";

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
  const t = useTranslations(
    "Settings.security.two_factor_authentication.setup_2fa"
  );

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
          {t("button_cancel")}
        </Button>
        <KeyRound className="h-16 w-16" />
        <Typography
          variant="h4"
          weight="semibold"
        >
          {t("title")}
        </Typography>
        <Typography
          variant="p"
          affects="normal"
          align="center"
          className="text-neutral-light-50 dark:text-neutral-dark-50"
        >
          {t("description_2")}
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
          <Typography
            variant="p"
            affects="normal"
          >
            {t("key_phrase")}
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
            label={t("label_key_phrase")}
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
        <Typography
          variant="p"
          affects="tiny"
        >
          {t("important_note")}
        </Typography>
      </div>
      {copied ? (
        <Button
          disabled={!copied}
          variant={`primary-${variant}`}
          fullWidth
          onClick={onClickAuthenticate}
        >
          {t("button_authenticate")}
        </Button>
      ) : (
        <Tooltip
          fullwidth
          content={t("important_note")}
          className={cn(buttonVariants({ variant: `primary-${variant}` }))}
        >
          {t("button_authenticate")}
        </Tooltip>
      )}
    </div>
  );
};
export default QrCode;
