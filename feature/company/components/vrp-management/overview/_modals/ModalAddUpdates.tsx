import { cn } from "@/core/lib/utils";
import {
  BaseModal,
  Button,
  Card,
  Input,
  Tiptap,
  Typography,
} from "@/core/ui/components";
import { X } from "lucide-react";

interface I_ModalAddUpdatesProps {
  onClose: () => void;
  isOpen: boolean;
}

const ModalAddUpdates = ({ isOpen, onClose }: I_ModalAddUpdatesProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <Card
        className={cn(
          "_flexbox__col__start__start h-full w-full gap-6",
          "mx-auto max-w-3xl rounded-xl xl:px-8 xl:py-8",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__row__center__start gap-5">
          <Button
            variant="tertiary-company"
            prefixIcon={<X />}
            className="p-0"
            onClick={onClose}
          />
          <Typography variant="h5" weight="bold">
            Add Updates
          </Typography>
        </div>
        <Card
          className={cn(
            "bg-neutral-light-100 xl:p-7.5 dark:bg-neutral-dark-100",
            "rounded-[10px]",
            "_flexbox__col__start__start gap-8"
          )}
        >
          <Typography variant="h5" weight="bold">
            Add Updates
          </Typography>
          <Typography variant="p" affects="small">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit
            amet tellus. Morbi tristique senectus et netus et malesuada fames ac
            turpis.
          </Typography>
          <Input type="text" label="Title" />
          <Tiptap
            description=""
            label="Updates"
            onChangeValue={(e) => {}}
            variant="company"
            withTooltip
          />
          <Button variant="primary-company">Publish Update</Button>
        </Card>
      </Card>
    </BaseModal>
  );
};
export default ModalAddUpdates;
