import { iconColor } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { BaseModal, Button, Typography } from "@/core/ui/components";
import { Role } from "@/types/admin/sidebar";
import { MonitorSmartphone } from "lucide-react";

interface I_ModalForbidddenProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: keyof typeof Role;
  title?: string;
  subtitle?: string;
}

const ModalForbiddden = ({
  isOpen,
  onClose,
  variant = "hacker",
  title = "Report fom Desktop",
  subtitle = "Vulnerability Reports are currently only accessible on the desktop version of our website.",
}: I_ModalForbidddenProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      className="bg-background-page-light/90 backdrop-blur-sm dark:bg-background-page-dark/90"
    >
      <div className="_flexbox__col__center mx-auto w-full max-w-xs gap-6 p-2">
        <MonitorSmartphone className={cn("h-12 w-12 ", iconColor[variant])} />
        <div className="_flexbox__col__center w-full gap-2">
          <Typography variant="h5" weight="semibold">
            {title}
          </Typography>
          <Typography variant="p" affects="normal" align="center">
            {subtitle}
          </Typography>
        </div>
        <Button variant={`secondary-${variant}`} fullWidth onClick={onClose}>
          Back
        </Button>
      </div>
    </BaseModal>
  );
};
export default ModalForbiddden;
