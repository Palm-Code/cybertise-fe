import { cn } from "@/core/lib/utils";
import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { I_SecurityProps } from "@/feature/settings/containers/Security.container";
import { KeyRound } from "lucide-react";
import { useState } from "react";
import ModalEdit2fa from "../../../_dialogs/two-factor-authentication/ModalEdit2fa";
import ModalSetup2fa from "../../../_dialogs/two-factor-authentication/ModalSetup2fa";
import ModalUnbind2fa from "../../../_dialogs/two-factor-authentication/ModalUnbind2fa";
import ModalVerify2fa from "../../../_dialogs/two-factor-authentication/ModalVerify2fa";
import { useTranslations } from "next-intl";

interface I_AuthenticationProps extends I_SecurityProps {}

const Authentication = ({
  twoFactorEnabled,
  variant,
}: I_AuthenticationProps) => {
  const t = useTranslations("Settings.security.two_factor_authentication");
  const [openModalSetup2fa, setOpenModalSetup2fa] = useState(false);
  const [openModalEdit2fa, setOpenModalEdit2fa] = useState(false);
  const [openModalDisable2fa, setOpenModalDisable2fa] = useState(false);
  const [openModalVerify2fa, setOpenModalVerify2fa] = useState(false);

  return (
    <>
      <div className="_flexbox__col__start__start w-full gap-6">
        <Card
          className={cn(
            "_flexbox__col__start__start w-full gap-6 rounded-xl px-4 py-8 xl:gap-3 xl:p-7.5",
            "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
          )}
        >
          <div className="_flexbox__row__start__between w-full">
            <Typography variant="h6" weight="bold" className="xl:inline-flex">
              <KeyRound className="mb-4 mr-4 h-8 w-8 xl:mb-0" />
              {t("label_2fa")}
            </Typography>
            <Badge variant="default">
              {twoFactorEnabled
                ? t("badge.connected")
                : t("badge.not_connected")}
            </Badge>
          </div>
          <Typography
            variant="p"
            affects="normal"
            className="text-neutral-light-40 dark:text-neutral-dark-40"
          >
            {t("label_2fa_description")}
          </Typography>
          <div className="_flexbox__row__center__start mt-3 gap-6">
            {twoFactorEnabled ? (
              <>
                <Button
                  size="ghost"
                  variant={`ghost-${variant}`}
                  onClick={() => setOpenModalEdit2fa(true)}
                >
                  {t("button_edit_2fa")}
                </Button>
                <Button
                  size="ghost"
                  variant={`ghost-${variant}`}
                  onClick={() => setOpenModalDisable2fa(true)}
                >
                  {t("button_unbind_2fa")}
                </Button>
                <Button
                  size="ghost"
                  variant={`ghost-${variant}`}
                  onClick={() => setOpenModalVerify2fa(true)}
                >
                  {t("button_verify_2fa")}
                </Button>
              </>
            ) : (
              <Button
                size="ghost"
                variant={`ghost-${variant}`}
                onClick={() => setOpenModalSetup2fa(true)}
              >
                {t("button_connect_2fa")}
              </Button>
            )}
          </div>
        </Card>
      </div>
      <ModalEdit2fa
        variant={variant}
        isOpen={openModalEdit2fa}
        onClose={() => setOpenModalEdit2fa(false)}
      />
      <ModalSetup2fa
        variant={variant}
        isOpen={openModalSetup2fa}
        onClose={() => setOpenModalSetup2fa(false)}
      />
      <ModalUnbind2fa
        variant={variant}
        isOpen={openModalDisable2fa}
        onClose={() => setOpenModalDisable2fa(false)}
      />
      <ModalVerify2fa
        variant={variant}
        isOpen={openModalVerify2fa}
        onClose={() => setOpenModalVerify2fa(false)}
      />
    </>
  );
};
export default Authentication;
