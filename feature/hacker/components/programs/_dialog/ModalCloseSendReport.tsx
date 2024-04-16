import { cn } from "@/core/lib/utils";
import { BaseModal, Button, Typography } from "@/core/ui/components";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";

interface I_ModalCloseSendReportProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCloseSendReport = ({
  isOpen,
  onClose,
}: I_ModalCloseSendReportProps) => {
  const router = useRouter();
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          "relative mx-auto w-fit max-w-[602px] rounded-lg p-20",
          "_flexbox__col__start__start gap-12",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__start__start w-full gap-6">
          <XCircle className="h-16 w-16 text-semantic-light-critical dark:text-semantic-dark-critical" />
          <Typography variant="h5" weight="bold">
            Cancel Submit Report?{" "}
          </Typography>
          <Typography variant="p" affects="normal" className="mt-2">
            You will loose all the information you have entered for the related
            reports.
          </Typography>
        </div>
        <div className="flex w-full items-center gap-6">
          <Button variant="secondary-hacker" fullWidth onClick={onClose}>
            Keep It
          </Button>
          <Button
            variant="primary-hacker"
            fullWidth
            onClick={() => router.back()}
          >
            Yes, Cancel report
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalCloseSendReport;
