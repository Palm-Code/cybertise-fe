import { cn } from "@/core/lib/utils";
import { BaseModal, Button, Typography } from "@/core/ui/components";
import { XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

interface I_ModalAddToContributorProps {
  isOpen: boolean;
  onClose: () => void;
  onClickConfirm: (value: 0 | 1) => void;
  isLoading?: boolean;
}

const ModalAddToContributor = ({
  isOpen,
  onClose,
  onClickConfirm,
  isLoading,
}: I_ModalAddToContributorProps) => {
  const t = useTranslations("SuccesState.close_send_report");
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          "relative mx-auto w-fit max-w-[602px] rounded-lg p-10",
          "_flexbox__col__start__start gap-12",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__start__start w-full gap-6">
          <XCircle className="h-16 w-16 text-semantic-light-critical dark:text-semantic-dark-critical" />
          <Typography variant="h5" weight="bold">
            Add Hacker to contributor list ?
          </Typography>
        </div>
        <div className="grid grid-cols-2 items-center gap-6">
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            variant="secondary-hacker"
            fullWidth
            onClick={() => onClickConfirm(0)}
          >
            Do not add to contributor
          </Button>
          <Button
            disabled={isLoading}
            isLoading={isLoading}
            variant="primary-hacker"
            fullWidth
            onClick={() => {
              onClickConfirm(1);
            }}
          >
            Add to contributor
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalAddToContributor;
