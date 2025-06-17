import { cn } from "@/core/lib/utils";
import { BaseModal, Button, Typography } from "@/core/ui/components";
import { Role } from "@/types/admin/sidebar";
import { XCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface I_ModalCloseVrpProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: keyof typeof Role;
}

export const ModalCloseVrp = ({
  isOpen,
  onClose,
  variant = "company",
}: I_ModalCloseVrpProps) => {
  const t = useTranslations("SuccesState.close_vrp");
  const router = useRouter();
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
    >
      <div
        className={cn(
          "relative mx-auto w-fit max-w-[602px] rounded-lg p-20",
          "_flexbox__col__start__start gap-12",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__start__start w-full gap-6">
          <XCircle className="h-16 w-16 text-semantic-light-critical dark:text-semantic-dark-critical" />
          <Typography
            variant="h5"
            weight="bold"
          >
            {t("title")}
          </Typography>
          <Typography
            variant="p"
            affects="normal"
            className="mt-2"
          >
            {t("description")}
          </Typography>
        </div>
        <div className="flex w-full items-center gap-6">
          <Button
            variant={`secondary-${variant}`}
            fullWidth
            onClick={onClose}
          >
            {t("button_keep_it")}
          </Button>
          <Button
            variant={`primary-${variant}`}
            fullWidth
            onClick={() => router.back()}
          >
            {t("button_yes_cancel_vrp")}
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
