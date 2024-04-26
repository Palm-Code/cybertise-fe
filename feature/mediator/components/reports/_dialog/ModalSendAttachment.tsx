import { cn } from "@/core/lib/utils";
import {
  BaseModal,
  Button,
  FileInput,
  Tiptap,
  Typography,
} from "@/core/ui/components";

interface I_ModalSendAttachmentProps {
  isOpen: boolean;
  onClose: () => void;
  onClickSendAttachment?: () => void;
}

const ModalSendAttachment = ({
  isOpen,
  onClose,
  onClickSendAttachment,
}: I_ModalSendAttachmentProps) => {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          "relative mx-auto w-full max-w-3xl rounded-xl px-8 py-12",
          "_flexbox__col__start__start gap-6",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__start__start w-full gap-6">
          <Typography variant="h5" weight="bold">
            Upload Attachment
          </Typography>
          <div
            className={cn(
              "_flexbox__col__center w-full gap-8 p-7",
              "rounded-[10px] bg-neutral-light-100 dark:bg-neutral-dark-100"
            )}
          >
            <FileInput onFileRemoved={() => {}} onFileSelected={() => {}} />
            <Tiptap
              description=""
              label="Write a caption"
              variant="mediator"
              isChat
              className="pb-12 shadow-none"
              onChangeValue={() => {}}
            />
          </div>
        </div>
        <div className="_flexbox__row__start__start gap-8">
          <Button variant="secondary-mediator" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary-mediator"
            fullWidth
            onClick={onClickSendAttachment}
          >
            Send Attachment
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalSendAttachment;
