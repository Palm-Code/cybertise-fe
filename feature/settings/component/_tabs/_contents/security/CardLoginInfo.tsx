import { cn } from "@/core/lib/utils";
import { Badge, Button, Card, Typography } from "@/core/ui/components";
import { Desktop } from "@/core/ui/layout";
import { I_SecurityProps } from "@/feature/settings/containers/Security.container";
import { RectangleEllipsis, X } from "lucide-react";
import CardEditPassword from "./CardEditPassword";
import { FormProvider, useForm } from "react-hook-form";
import {
  formResetPasswordShcema,
  I_GetResetPasswordRequest,
} from "@/core/models/auth/forgot-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostResetPassword } from "@/feature/auth/query/password";
import { useTranslations } from "next-intl";

interface I_CardLoginInfoProps extends I_SecurityProps {}

const CardLoginInfo = ({
  variant,
  isEditing,
  handleClickEdit = () => {},
}: I_CardLoginInfoProps) => {
  const t = useTranslations("Settings.security.login_info");
  const methods = useForm<I_GetResetPasswordRequest>({
    resolver: zodResolver(formResetPasswordShcema),
    defaultValues: {
      old_password: "",
      new_password: "",
      logout_all: 0,
    },
  });

  const { mutateAsync, isPending, isSuccess } = usePostResetPassword();

  if (isEditing)
    return (
      <FormProvider {...methods}>
        <Desktop>
          <div className="_flexbox__col__start__start gap-6">
            <Card
              className={cn(
                "rounded-2xl rounded-b-none xl:px-8 xl:py-6",
                "_flexbox__row__center__between w-full"
              )}
            >
              <div className="_flexbox__row__center__start gap-5">
                <Button
                  variant={`tertiary-${variant}`}
                  prefixIcon={<X />}
                  className="p-0"
                  onClick={() => handleClickEdit(false)}
                />
                <Typography variant="h5" weight="bold" className="capitalize">
                  {t("change_login_password")}
                </Typography>
              </div>
            </Card>
            <Card className="_flexbox__col__start__start w-full gap-8 xl:px-6 xl:py-12">
              <CardEditPassword variant={variant} />
              <div className="_flexbox__row__center__start gap-6">
                <Button
                  variant={`secondary-${variant}`}
                  onClick={() => handleClickEdit(false)}
                >
                  {t("button_discard")}
                </Button>
                <Button
                  disabled={
                    isPending ||
                    isSuccess ||
                    !methods.watch().is_match ||
                    !methods.watch().isValidated
                  }
                  isLoading={isPending}
                  variant={`primary-${variant}`}
                  onClick={() =>
                    mutateAsync(methods.watch())
                      .then()
                      .catch((err) => {
                        methods.setError("root", err?.message, {
                          shouldFocus: true,
                        });
                      })
                  }
                >
                  {t("button_save")}
                </Button>
              </div>
            </Card>
          </div>
        </Desktop>
      </FormProvider>
    );

  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6 rounded-xl px-6 py-8 xl:gap-3 xl:p-7.5",
        "xl:bg-neutral-light-100 xl:dark:bg-neutral-dark-100"
      )}
    >
      <div className="_flexbox__row__start__between w-full">
        <Typography variant="h6" weight="bold" className="xl:inline-flex">
          <RectangleEllipsis className="mb-4 h-8 w-8 xl:mr-4" />
          {t("login_password")}
        </Typography>
      </div>
      <Typography
        variant="p"
        affects="normal"
        className="text-neutral-light-40 dark:text-neutral-dark-40"
      >
        {t("login_password_description")}
      </Typography>
      <Button
        size="ghost"
        variant={`ghost-${variant}`}
        className="mt-3"
        onClick={() => handleClickEdit(true)}
      >
        {t("button_edit_password")}
      </Button>
    </Card>
  );
};
export default CardLoginInfo;
