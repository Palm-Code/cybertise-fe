import { BaseModal, Button, Typography } from "@/core/ui/components";
import { MonitorSmartphone } from "lucide-react";

interface I_ModalForbidddenProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalForbiddden = ({ isOpen, onClose }: I_ModalForbidddenProps) => {
  return (
    <BaseModal
      isOpen={isOpen}
      className="bg-background-page-light/90 backdrop-blur-sm dark:bg-background-page-dark/90"
    >
      <div className="_flexbox__col__center mx-auto w-full max-w-56 gap-6">
        <MonitorSmartphone className="h-12 w-12 text-lime-normal-light dark:text-lime-normal-dark" />
        <div className="_flexbox__col__center w-full gap-2">
          <Typography variant="h5" weight="semibold">
            Report fom Desktop
          </Typography>
          <Typography variant="p" affects="normal" align="center">
            Vulnerability Reports are currently only accessible on the desktop
            version of our website.
          </Typography>
        </div>
        <Button variant="secondary-hacker" fullWidth onClick={onClose}>
          Back
        </Button>
      </div>
    </BaseModal>
  );
};
export default ModalForbiddden;
